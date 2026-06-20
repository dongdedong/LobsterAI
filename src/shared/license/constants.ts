export const LicensePlan = {
  Trial: 'trial',
  Standard: 'standard',
  Enterprise: 'enterprise',
} as const;
export type LicensePlan = typeof LicensePlan[keyof typeof LicensePlan];

export const LicenseFeature = {
  Cowork: 'cowork',
  Byok: 'byok',
  LocalModel: 'local-model',
  Skills: 'skills',
} as const;
export type LicenseFeature = typeof LicenseFeature[keyof typeof LicenseFeature];

export const LicenseStatusKind = {
  Trial: 'trial',
  Valid: 'valid',
  Missing: 'missing',
  Expired: 'expired',
  InvalidSignature: 'invalid-signature',
  MachineMismatch: 'machine-mismatch',
  InvalidFormat: 'invalid-format',
  FeatureMissing: 'feature-missing',
  Error: 'error',
} as const;
export type LicenseStatusKind = typeof LicenseStatusKind[keyof typeof LicenseStatusKind];

export const LICENSE_TRIAL_DAYS = 14;
export const LICENSE_PRODUCT_ID = 'topvan-ai-agent';

export interface LicensePayload {
  product: string;
  customer: string;
  plan: LicensePlan;
  seats: number;
  features: LicenseFeature[];
  machineBinding?: string;
  issuedAt: string;
  expiresAt: string;
}

export interface SignedLicense {
  algorithm: 'ed25519';
  payload: LicensePayload;
  signature: string;
}

export interface LicenseStatus {
  kind: LicenseStatusKind;
  canStartCowork: boolean;
  machineCode: string;
  trialStartedAt?: string;
  trialExpiresAt?: string;
  payload?: LicensePayload;
  importedAt?: string;
  reason?: string;
}
