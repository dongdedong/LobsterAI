#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const failures = [];
const warnings = [];
let passCount = 0;

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function pass(message) {
  passCount += 1;
  console.log(`[pass] ${message}`);
}

function warn(message) {
  warnings.push(message);
  console.log(`[warn] ${message}`);
}

function fail(message) {
  failures.push(message);
  console.error(`[fail] ${message}`);
}

function expect(condition, message) {
  if (condition) {
    pass(message);
  } else {
    fail(message);
  }
}

function extractConstBlock(source, constName) {
  const marker = `export const ${constName}`;
  const start = source.indexOf(marker);
  if (start < 0) {
    return '';
  }
  const end = source.indexOf('};', start);
  return end < 0 ? source.slice(start) : source.slice(start, end + 2);
}

function whereAll(command) {
  const result = spawnSync(process.platform === 'win32' ? 'where.exe' : 'which', [command], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  if (result.status !== 0 || !result.stdout) {
    return [];
  }
  return result.stdout.trim().split(/\r?\n/).map(item => item.trim()).filter(Boolean);
}

function isWslBashPath(candidate) {
  const normalized = candidate.toLowerCase().replace(/\//g, '\\');
  return normalized.endsWith('\\windowsapps\\bash.exe')
    || normalized.endsWith('\\system32\\bash.exe');
}

function checkPackageMetadata() {
  const pkg = readJson('package.json');
  const scripts = pkg.scripts || {};
  const author = pkg.author || {};
  expect(author.name === 'TopVan', 'package author is TopVan');
  expect(!author.email || !/netease|youdao|163\.com/i.test(author.email), 'package author email does not point to upstream vendor');
  expect(typeof scripts['dist:win'] === 'string' && scripts['dist:win'].includes('electron-builder --win --x64'), 'Windows installer script is present');
  expect(typeof scripts['build'] === 'string' && scripts.build.includes('tsc') && scripts.build.includes('vite build'), 'production build script runs TypeScript and Vite');
  const builderConfig = readText('scripts/electron-builder-config.cjs');
  expect(builderConfig.includes('CSC_IDENTITY_AUTO_DISCOVERY'), 'Windows signing auto-discovery policy is explicit for MVP packaging');
  expect(builderConfig.includes('signAndEditExecutable'), 'Windows unsigned MVP packaging skips executable sign/edit unless signing is configured');

  const pluginText = JSON.stringify(pkg.openclaw?.plugins || []);
  if (/netease|npm\.nie\.netease|popo/i.test(pluginText)) {
    warn('OpenClaw plugin metadata still contains NetEase-family legacy integrations; keep them hidden or review before commercial release.');
  } else {
    pass('OpenClaw plugin metadata has no NetEase-family entries');
  }
}

function checkWindowsBuildTools() {
  if (process.platform !== 'win32') {
    pass('non-Windows host does not need Git Bash for local preflight');
    return;
  }

  const bashPaths = whereAll('bash');
  const gitBashFromPath = bashPaths.find(candidate => !isWslBashPath(candidate));
  const gitPaths = whereAll('git');
  const gitBashFromGit = gitPaths
    .map(gitPath => path.resolve(path.dirname(gitPath), '..'))
    .flatMap(gitRoot => [
      path.join(gitRoot, 'bin', 'bash.exe'),
      path.join(gitRoot, 'usr', 'bin', 'bash.exe'),
    ])
    .find(candidate => fs.existsSync(candidate));

  if (bashPaths.some(isWslBashPath)) {
    warn('WSL bash appears before or alongside Git Bash in PATH; packaging must use Git Bash, not WSL bash.');
  }
  expect(Boolean(gitBashFromPath || gitBashFromGit), 'Git Bash is available for OpenClaw runtime packaging');
}

function checkLocalByokDefaults() {
  const remoteServices = readText('src/shared/remoteServices/constants.ts');
  const localByokBlock = extractConstBlock(remoteServices, 'LOCAL_BYOK_REMOTE_SERVICES');
  expect(localByokBlock.includes('RemoteServicesMode.LocalByok'), 'Local BYOK remote services use LocalByok mode');
  expect(localByokBlock.includes('ServerModelMode.Disabled'), 'Local BYOK remote services disable server models');
  expect(/LocalByokInternalUrl\./.test(localByokBlock), 'Local BYOK remote services use internal placeholder URLs');
  expect(!/https?:\/\/|127\.0\.0\.1|youdao|netease|163\.com|127\.net|api-overmind|lobsterai-server/i.test(localByokBlock), 'Local BYOK defaults do not point to upstream or local compatibility servers');

  const rendererConfig = readText('src/renderer/config.ts');
  expect(/mode:\s*RemoteServicesMode\.LocalByok/.test(rendererConfig), 'renderer default config starts in Local BYOK mode');
  expect(/serverModelMode:\s*ServerModelMode\.Disabled/.test(rendererConfig), 'renderer default config disables server model mode');
}

function checkMvpSurfaceGates() {
  const rendererConfig = readText('src/renderer/config.ts');
  expect(/MVP_HIDDEN_PROVIDER_IDS[\s\S]*ProviderName\.Youdaozhiyun/.test(rendererConfig), 'Youdao provider is hidden from MVP provider list');

  const platformConstants = readText('src/shared/platform/constants.ts');
  expect(/BACKEND_FREE_MVP_HIDDEN_PLATFORMS[\s\S]*'nim'[\s\S]*'netease-bee'[\s\S]*'popo'/.test(platformConstants), 'NetEase-family IM platforms are hidden from MVP platform list');

  const skillConfig = readJson('SKILLs/skills.config.json');
  expect(skillConfig.defaults?.youdaonote?.enabled === false, 'youdaonote skill is disabled by default');
}

function checkLicenseAndNotices() {
  const licenseManager = readText('src/main/libs/licenseManager.ts');
  expect(!/BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY/.test(licenseManager), 'client license manager does not contain a private signing key');
  expect(licenseManager.includes('TOPVAN_LICENSE_PUBLIC_KEY_PEM'), 'license public key can be overridden for production builds');

  const noticePath = path.join(rootDir, 'THIRD_PARTY_NOTICES.md');
  expect(fs.existsSync(noticePath), 'third-party notices file exists');
  if (fs.existsSync(noticePath)) {
    const notice = fs.readFileSync(noticePath, 'utf8');
    expect(/Local BYOK MVP/i.test(notice) && /legacy integration/i.test(notice), 'third-party notices cover Local BYOK and legacy integrations');
  }
}

function checkCustomerDocs() {
  const docPath = path.join(rootDir, 'docs_mine', '09_安装包诊断与试点验收计划.md');
  expect(fs.existsSync(docPath), 'phase 5 packaging and pilot validation document exists');
  if (fs.existsSync(docPath)) {
    const doc = fs.readFileSync(docPath, 'utf8');
    expect(doc.includes('npm run mvp:preflight') && doc.includes('npm run dist:win'), 'phase 5 document includes preflight and Windows packaging commands');
  }
}

function main() {
  console.log('Running Local BYOK MVP release preflight...\n');
  checkPackageMetadata();
  checkWindowsBuildTools();
  checkLocalByokDefaults();
  checkMvpSurfaceGates();
  checkLicenseAndNotices();
  checkCustomerDocs();

  console.log('\nPreflight summary:');
  console.log(`  passed checks: ${passCount}`);
  console.log(`  warnings: ${warnings.length}`);
  console.log(`  failures: ${failures.length}`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main();
