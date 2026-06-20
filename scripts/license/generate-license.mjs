import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  const key = process.argv[i];
  const value = process.argv[i + 1];
  if (!key?.startsWith('--') || value === undefined) {
    throw new Error(`Invalid argument near ${key ?? '<empty>'}`);
  }
  args.set(key.slice(2), value);
}

const required = name => {
  const value = args.get(name)?.trim();
  if (!value) throw new Error(`Missing --${name}`);
  return value;
};

const privateKeyPem = process.env.TOPVAN_LICENSE_PRIVATE_KEY_PEM?.replace(/\\n/g, '\n');
if (!privateKeyPem) {
  throw new Error('TOPVAN_LICENSE_PRIVATE_KEY_PEM is required.');
}

const payload = {
  product: args.get('product') || 'topvan-ai-agent',
  customer: required('customer'),
  plan: args.get('plan') || 'trial',
  seats: Number(args.get('seats') || '1'),
  features: (args.get('features') || 'cowork,byok,local-model,skills')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
    .sort(),
  machineBinding: args.get('machine') || '',
  issuedAt: args.get('issuedAt') || new Date().toISOString(),
  expiresAt: required('expiresAt'),
};

if (!Number.isFinite(payload.seats) || payload.seats < 1) {
  throw new Error('--seats must be a positive number.');
}

const canonical = JSON.stringify({
  customer: payload.customer,
  expiresAt: payload.expiresAt,
  features: payload.features,
  issuedAt: payload.issuedAt,
  machineBinding: payload.machineBinding,
  plan: payload.plan,
  product: payload.product,
  seats: payload.seats,
});

const signature = crypto
  .sign(null, Buffer.from(canonical, 'utf8'), crypto.createPrivateKey(privateKeyPem))
  .toString('base64');

const license = {
  algorithm: 'ed25519',
  payload,
  signature,
};

const out = args.get('out') || `license-${payload.customer.replace(/[^a-z0-9_-]+/gi, '-')}.json`;
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(license, null, 2)}\n`, 'utf8');
console.log(`License written to ${out}`);
