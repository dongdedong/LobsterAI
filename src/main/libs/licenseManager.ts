import crypto from 'crypto';
import fs from 'fs';
import os from 'os';

import {
  LICENSE_PRODUCT_ID,
  LICENSE_TRIAL_DAYS,
  LicenseFeature,
  type LicensePayload,
  type LicenseStatus,
  LicenseStatusKind,
  type SignedLicense,
} from '../../shared/license';

const LICENSE_STORE_KEY = 'local_license.signed.v1';
const LICENSE_IMPORTED_AT_KEY = 'local_license.importedAt.v1';
const LICENSE_TRIAL_STARTED_AT_KEY = 'local_license.trialStartedAt.v1';

const DEFAULT_LICENSE_PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAlQ36GE5BvPTMUM1D4QpYLPYImMw5K+8BGmRehMnCXgQ=
-----END PUBLIC KEY-----`;

type LicenseStore = {
  get<T = unknown>(key: string): T | undefined;
  set<T = unknown>(key: string, value: T): void;
  delete(key: string): void;
};

export const getLicensePublicKeyPem = (): string => (
  process.env.TOPVAN_LICENSE_PUBLIC_KEY_PEM?.replace(/\\n/g, '\n')
  || DEFAULT_LICENSE_PUBLIC_KEY_PEM
);

export const canonicalizeLicensePayload = (payload: LicensePayload): string => JSON.stringify({
  customer: payload.customer,
  expiresAt: payload.expiresAt,
  features: [...payload.features].sort(),
  issuedAt: payload.issuedAt,
  machineBinding: payload.machineBinding || '',
  plan: payload.plan,
  product: payload.product,
  seats: payload.seats,
});

const isoNow = (): string => new Date().toISOString();

const addDays = (isoDate: string, days: number): string => {
  const time = Date.parse(isoDate);
  const base = Number.isFinite(time) ? time : Date.now();
  return new Date(base + days * 24 * 60 * 60 * 1000).toISOString();
};

const isIsoDate = (value: unknown): value is string => (
  typeof value === 'string'
  && Number.isFinite(Date.parse(value))
);

const isStringArray = (value: unknown): value is string[] => (
  Array.isArray(value) && value.every(item => typeof item === 'string')
);

const normalizeSignedLicense = (value: unknown): SignedLicense | null => {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Partial<SignedLicense>;
  const payload = raw.payload as Partial<LicensePayload> | undefined;
  if (raw.algorithm !== 'ed25519' || typeof raw.signature !== 'string' || !payload) {
    return null;
  }
  if (
    typeof payload.product !== 'string'
    || typeof payload.customer !== 'string'
    || typeof payload.plan !== 'string'
    || typeof payload.seats !== 'number'
    || !Number.isFinite(payload.seats)
    || payload.seats < 1
    || !isStringArray(payload.features)
    || !isIsoDate(payload.issuedAt)
    || !isIsoDate(payload.expiresAt)
    || (payload.machineBinding !== undefined && typeof payload.machineBinding !== 'string')
  ) {
    return null;
  }
  return raw as SignedLicense;
};

export const buildLocalMachineCode = (): string => {
  const material = [
    os.hostname(),
    os.userInfo().username,
    process.platform,
    process.arch,
  ].join('|');
  return crypto.createHash('sha256').update(material).digest('hex').slice(0, 32);
};

export class LicenseManager {
  constructor(
    private readonly store: LicenseStore,
    private readonly publicKeyPem: string = getLicensePublicKeyPem(),
    private readonly machineCode: string = buildLocalMachineCode(),
  ) {}

  getMachineCode(): string {
    return this.machineCode;
  }

  getStatus(): LicenseStatus {
    const signedLicense = this.store.get<unknown>(LICENSE_STORE_KEY);
    if (!signedLicense) {
      return this.getTrialStatus();
    }

    const normalized = normalizeSignedLicense(signedLicense);
    if (!normalized) {
      return this.buildBlockedStatus(LicenseStatusKind.InvalidFormat, 'License file format is invalid.');
    }

    const payload = normalized.payload;
    if (payload.product !== LICENSE_PRODUCT_ID) {
      return this.buildBlockedStatus(LicenseStatusKind.InvalidFormat, 'License product does not match this application.', payload);
    }
    if (!this.verifySignature(normalized)) {
      return this.buildBlockedStatus(LicenseStatusKind.InvalidSignature, 'License signature verification failed.', payload);
    }
    if (payload.machineBinding && payload.machineBinding !== this.machineCode) {
      return this.buildBlockedStatus(LicenseStatusKind.MachineMismatch, 'License is bound to another machine.', payload);
    }
    if (Date.parse(payload.expiresAt) < Date.now()) {
      return this.buildBlockedStatus(LicenseStatusKind.Expired, 'License has expired.', payload);
    }
    if (!payload.features.includes(LicenseFeature.Cowork)) {
      return this.buildBlockedStatus(LicenseStatusKind.FeatureMissing, 'License does not include Cowork.', payload);
    }

    return {
      kind: LicenseStatusKind.Valid,
      canStartCowork: true,
      machineCode: this.machineCode,
      payload,
      importedAt: this.store.get<string>(LICENSE_IMPORTED_AT_KEY),
    };
  }

  importLicenseFile(filePath: string): LicenseStatus {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    this.store.set(LICENSE_STORE_KEY, parsed);
    this.store.set(LICENSE_IMPORTED_AT_KEY, isoNow());
    return this.getStatus();
  }

  clearLicense(): LicenseStatus {
    this.store.delete(LICENSE_STORE_KEY);
    this.store.delete(LICENSE_IMPORTED_AT_KEY);
    return this.getStatus();
  }

  private getTrialStatus(): LicenseStatus {
    const existingStartedAt = this.store.get<string>(LICENSE_TRIAL_STARTED_AT_KEY);
    const trialStartedAt = isIsoDate(existingStartedAt) ? existingStartedAt : isoNow();
    if (!existingStartedAt) {
      this.store.set(LICENSE_TRIAL_STARTED_AT_KEY, trialStartedAt);
    }
    const trialExpiresAt = addDays(trialStartedAt, LICENSE_TRIAL_DAYS);
    const canStartCowork = Date.parse(trialExpiresAt) >= Date.now();
    return {
      kind: canStartCowork ? LicenseStatusKind.Trial : LicenseStatusKind.Missing,
      canStartCowork,
      machineCode: this.machineCode,
      trialStartedAt,
      trialExpiresAt,
      ...(canStartCowork ? {} : { reason: 'Trial period has expired.' }),
    };
  }

  private buildBlockedStatus(
    kind: LicenseStatusKind,
    reason: string,
    payload?: LicensePayload,
  ): LicenseStatus {
    return {
      kind,
      canStartCowork: false,
      machineCode: this.machineCode,
      payload,
      importedAt: this.store.get<string>(LICENSE_IMPORTED_AT_KEY),
      reason,
    };
  }

  private verifySignature(license: SignedLicense): boolean {
    try {
      return crypto.verify(
        null,
        Buffer.from(canonicalizeLicensePayload(license.payload), 'utf8'),
        crypto.createPublicKey(this.publicKeyPem),
        Buffer.from(license.signature, 'base64'),
      );
    } catch {
      return false;
    }
  }
}

export const createLicenseManager = (store: LicenseStore): LicenseManager => new LicenseManager(store);
