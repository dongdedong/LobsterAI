import crypto from 'crypto';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
  LICENSE_PRODUCT_ID,
  LicenseFeature,
  type LicensePayload,
  LicensePlan,
  LicenseStatusKind,
  type SignedLicense,
} from '../../shared/license';
import { canonicalizeLicensePayload, LicenseManager } from './licenseManager';

class MemoryStore {
  private values = new Map<string, unknown>();

  get<T = unknown>(key: string): T | undefined {
    return this.values.get(key) as T | undefined;
  }

  set<T = unknown>(key: string, value: T): void {
    this.values.set(key, value);
  }

  delete(key: string): void {
    this.values.delete(key);
  }
}

const createSignedLicense = (
  privateKeyPem: string,
  overrides: Partial<LicensePayload> = {},
): SignedLicense => {
  const payload: LicensePayload = {
    product: LICENSE_PRODUCT_ID,
    customer: 'Acme',
    plan: LicensePlan.Standard,
    seats: 1,
    features: [LicenseFeature.Cowork, LicenseFeature.Byok],
    issuedAt: '2026-06-01T00:00:00.000Z',
    expiresAt: '2026-07-01T00:00:00.000Z',
    ...overrides,
  };

  return {
    algorithm: 'ed25519',
    payload,
    signature: crypto
      .sign(null, Buffer.from(canonicalizeLicensePayload(payload), 'utf8'), crypto.createPrivateKey(privateKeyPem))
      .toString('base64'),
  };
};

describe('LicenseManager', () => {
  let publicKeyPem = '';
  let privateKeyPem = '';

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-20T00:00:00.000Z'));
    const pair = crypto.generateKeyPairSync('ed25519');
    publicKeyPem = pair.publicKey.export({ type: 'spki', format: 'pem' }).toString();
    privateKeyPem = pair.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('allows a local trial when no license is imported', () => {
    const manager = new LicenseManager(new MemoryStore(), publicKeyPem, 'machine-a');

    const status = manager.getStatus();

    expect(status.kind).toBe(LicenseStatusKind.Trial);
    expect(status.canStartCowork).toBe(true);
    expect(status.trialExpiresAt).toBe('2026-07-04T00:00:00.000Z');
  });

  test('accepts a valid signed license', () => {
    const store = new MemoryStore();
    const manager = new LicenseManager(store, publicKeyPem, 'machine-a');
    store.set('local_license.signed.v1', createSignedLicense(privateKeyPem, {
      machineBinding: 'machine-a',
    }));

    const status = manager.getStatus();

    expect(status.kind).toBe(LicenseStatusKind.Valid);
    expect(status.canStartCowork).toBe(true);
    expect(status.payload?.customer).toBe('Acme');
  });

  test('rejects a tampered signed license', () => {
    const store = new MemoryStore();
    const manager = new LicenseManager(store, publicKeyPem, 'machine-a');
    const license = createSignedLicense(privateKeyPem);
    store.set('local_license.signed.v1', {
      ...license,
      payload: { ...license.payload, customer: 'Tampered' },
    });

    const status = manager.getStatus();

    expect(status.kind).toBe(LicenseStatusKind.InvalidSignature);
    expect(status.canStartCowork).toBe(false);
  });

  test('rejects expired and machine-mismatched licenses', () => {
    const expiredStore = new MemoryStore();
    expiredStore.set('local_license.signed.v1', createSignedLicense(privateKeyPem, {
      expiresAt: '2026-06-01T00:00:00.000Z',
    }));
    expect(new LicenseManager(expiredStore, publicKeyPem, 'machine-a').getStatus().kind)
      .toBe(LicenseStatusKind.Expired);

    const mismatchStore = new MemoryStore();
    mismatchStore.set('local_license.signed.v1', createSignedLicense(privateKeyPem, {
      machineBinding: 'machine-b',
    }));
    expect(new LicenseManager(mismatchStore, publicKeyPem, 'machine-a').getStatus().kind)
      .toBe(LicenseStatusKind.MachineMismatch);
  });

  test('rejects licenses without Cowork feature', () => {
    const store = new MemoryStore();
    const manager = new LicenseManager(store, publicKeyPem, 'machine-a');
    store.set('local_license.signed.v1', createSignedLicense(privateKeyPem, {
      features: [LicenseFeature.Byok],
    }));

    expect(manager.getStatus().kind).toBe(LicenseStatusKind.FeatureMissing);
  });
});
