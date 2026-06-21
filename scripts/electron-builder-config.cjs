'use strict';

const fs = require('fs');
const path = require('path');

const config = require('../electron-builder.json');

const DEFAULT_KEYFROM = 'official';
const KEYFROM_PATTERN = /^[a-z0-9_-]{1,64}$/;

function normalizeKeyfrom(value) {
  if (typeof value !== 'string') return DEFAULT_KEYFROM;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return DEFAULT_KEYFROM;
  if (!KEYFROM_PATTERN.test(normalized)) return DEFAULT_KEYFROM;
  return normalized;
}

function readBuildKeyfrom() {
  if (process.env.KEYFROM !== undefined) {
    return normalizeKeyfrom(process.env.KEYFROM);
  }

  const buildInfoPath = path.join(__dirname, '..', '.keyfrom-build', 'keyfrom.json');
  try {
    if (!fs.existsSync(buildInfoPath)) {
      return DEFAULT_KEYFROM;
    }
    const parsed = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'));
    return normalizeKeyfrom(parsed?.keyfrom);
  } catch (error) {
    console.warn('[Keyfrom] failed to read build keyfrom for artifact names, using official:', error);
    return DEFAULT_KEYFROM;
  }
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function resourceKey(resource) {
  if (typeof resource === 'string') return `string:${resource}`;
  return `${resource?.from || ''}->${resource?.to || ''}`;
}

function mergeExtraResources(platformName) {
  const baseResources = asArray(config.extraResources);
  const platformConfig = config[platformName] || {};
  const platformResources = asArray(platformConfig.extraResources);
  const merged = [];
  const seen = new Set();

  for (const resource of [...baseResources, ...platformResources]) {
    const key = resourceKey(resource);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(resource);
  }

  config[platformName] = {
    ...platformConfig,
    extraResources: merged,
  };
}

const keyfrom = readBuildKeyfrom();

const hasExplicitWindowsSigningConfig = Boolean(
  process.env.CSC_LINK
  || process.env.WIN_CSC_LINK
  || process.env.CSC_NAME
  || process.env.WIN_CSC_NAME
);

if (!hasExplicitWindowsSigningConfig && process.env.CSC_IDENTITY_AUTO_DISCOVERY === undefined) {
  process.env.CSC_IDENTITY_AUTO_DISCOVERY = 'false';
  console.log('[CodeSign] disabled Windows certificate auto-discovery for unsigned MVP packaging');
}

for (const platformName of ['mac', 'win', 'linux']) {
  mergeExtraResources(platformName);
}

if (!hasExplicitWindowsSigningConfig) {
  config.win = {
    ...(config.win || {}),
    signAndEditExecutable: false,
  };
  console.log('[CodeSign] disabled Windows executable signing/editing for unsigned MVP packaging');
}

delete config.extraResources;

config.dmg = {
  ...(config.dmg || {}),
  artifactName: `TopVanAI-darwin-\${arch}-\${version}-${keyfrom}.\${ext}`,
};

config.nsis = {
  ...(config.nsis || {}),
  artifactName: `TopVanAI-Setup-\${arch}-\${version}-${keyfrom}.\${ext}`,
};

console.log(`[Keyfrom] configured artifact keyfrom as ${keyfrom}`);

module.exports = config;
