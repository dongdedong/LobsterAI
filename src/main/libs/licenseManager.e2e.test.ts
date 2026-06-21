import crypto from 'crypto';
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';

import { LicenseStatusKind } from '../../shared/license';
import { LicenseManager } from './licenseManager';

/**
 * End-to-end: CLI generate-license.mjs → LicenseManager.importLicenseFile()
 *
 * Verifies the CLI-generated license file can be successfully validated
 * by the client-side LicenseManager, ensuring canonical serialization
 * and Ed25519 signing are consistent across both codepaths.
 */
describe('License CLI → LicenseManager e2e', () => {
  let tmpDir: string;
  let publicKeyPem: string;
  let privateKeyPem: string;

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

  const cliPath = path.resolve(__dirname, '../../../scripts/license/generate-license.mjs');

  /** Run generate-license.mjs via spawnSync (avoids shell quoting/path issues). */
  const runCli = (args: string[], privateKey: string): void => {
    const result = spawnSync(process.execPath, [cliPath, ...args], {
      encoding: 'utf8',
      env: {
        ...process.env,
        TOPVAN_LICENSE_PRIVATE_KEY_PEM: privateKey.replace(/\n/g, '\\n'),
      },
    });
    if (result.status !== 0) {
      throw new Error(`CLI exited ${result.status}: ${result.stderr || result.stdout}`);
    }
  };

  beforeAll(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'license-e2e-'));
    const pair = crypto.generateKeyPairSync('ed25519');
    publicKeyPem = pair.publicKey.export({ type: 'spki', format: 'pem' }).toString();
    privateKeyPem = pair.privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  });

  afterAll(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('CLI-generated license passes LicenseManager validation', () => {
    const outFile = path.join(tmpDir, 'test-license.json');

    runCli([
      '--customer', 'E2E-Test',
      '--plan', 'standard',
      '--expiresAt', '2099-12-31T00:00:00.000Z',
      '--out', outFile,
    ], privateKeyPem);

    expect(fs.existsSync(outFile)).toBe(true);

    const manager = new LicenseManager(new MemoryStore(), publicKeyPem, 'any-machine');
    const status = manager.importLicenseFile(outFile);

    expect(status.kind).toBe(LicenseStatusKind.Valid);
    expect(status.canStartCowork).toBe(true);
    expect(status.payload?.customer).toBe('E2E-Test');
    expect(status.payload?.plan).toBe('standard');
  });

  test('CLI-generated license with machine binding is rejected for wrong machine', () => {
    const outFile = path.join(tmpDir, 'test-license-bound.json');

    runCli([
      '--customer', 'Bound-Test',
      '--plan', 'standard',
      '--machine', 'specific-machine-code-abc123',
      '--expiresAt', '2099-12-31T00:00:00.000Z',
      '--out', outFile,
    ], privateKeyPem);

    // Should fail validation with wrong machine code
    const wrongMachineManager = new LicenseManager(new MemoryStore(), publicKeyPem, 'wrong-machine');
    const wrongStatus = wrongMachineManager.importLicenseFile(outFile);
    expect(wrongStatus.kind).toBe(LicenseStatusKind.MachineMismatch);
    expect(wrongStatus.canStartCowork).toBe(false);

    // Should pass with correct machine code
    const correctMachineManager = new LicenseManager(new MemoryStore(), publicKeyPem, 'specific-machine-code-abc123');
    const correctStatus = correctMachineManager.importLicenseFile(outFile);
    expect(correctStatus.kind).toBe(LicenseStatusKind.Valid);
    expect(correctStatus.canStartCowork).toBe(true);
  });
});
