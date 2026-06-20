import { afterEach, expect, test } from 'vitest';

import {
  areCloudRemoteFeaturesEnabled,
  isServerModelModeEnabled,
  RemoteServicesMode,
  resolveRemoteServicesConfig,
  ServerModelMode,
} from './constants';

afterEach(() => {
  delete process.env.LOBSTERAI_SERVER_BASE_URL;
});

test('uses local BYOK endpoints by default', () => {
  const config = resolveRemoteServicesConfig(undefined, { testMode: false });

  expect(config.mode).toBe(RemoteServicesMode.LocalByok);
  expect(config.serverModelMode).toBe(ServerModelMode.Disabled);
  expect(config.serverApiBaseUrl).toBe('http://127.0.0.1:8787');
  expect(config.portalBaseUrl).toBe('http://127.0.0.1:8787');
  expect(config.serviceTermsUrl).toBe('http://127.0.0.1:8787/service-terms');
});

test('default endpoints do not point to Youdao or NetEase services', () => {
  const config = resolveRemoteServicesConfig(undefined, { testMode: false });
  const urls = Object.entries(config)
    .filter(([, value]) => typeof value === 'string')
    .map(([, value]) => value as string);

  expect(urls.join('\n')).not.toMatch(/youdao|netease|163\.com|127\.net|api-overmind|lobsterai-server/i);
});

test('uses official production endpoints when explicitly selected', () => {
  const config = resolveRemoteServicesConfig({
    mode: RemoteServicesMode.Official,
  }, { testMode: false });

  expect(config.serverApiBaseUrl).toBe('https://lobsterai-server.youdao.com');
  expect(config.portalBaseUrl).toBe('https://lobsterai.youdao.com/portal#');
});

test('uses official test endpoints when official mode and test mode are enabled', () => {
  const config = resolveRemoteServicesConfig({
    mode: RemoteServicesMode.Official,
  }, { testMode: true });

  expect(config.serverApiBaseUrl).toBe('https://lobsterai-server.inner.youdao.com');
  expect(config.portalBaseUrl).toBe('https://lobsterai.inner.youdao.com/portal#');
});

test('defaults self-hosted mode to managed proxy URLs', () => {
  const config = resolveRemoteServicesConfig({
    mode: RemoteServicesMode.SelfHosted,
    serverApiBaseUrl: 'http://127.0.0.1:8787/',
  });

  expect(config.serverModelMode).toBe(ServerModelMode.ManagedProxy);
  expect(config.serverApiBaseUrl).toBe('http://127.0.0.1:8787');
  expect(config.portalBaseUrl).toBe('http://127.0.0.1:8787');
  expect(config.htmlSharePublicBaseUrl).toBe('http://127.0.0.1:8787/s');
  expect(config.loginOvermindUrl).toBe('http://127.0.0.1:8787/catalog/login-url.json');
  expect(config.mcpMarketplaceUrl).toBe('http://127.0.0.1:8787/catalog/mcp-marketplace.json');
});

test('defaults local BYOK mode to disabled server models', () => {
  const config = resolveRemoteServicesConfig({
    mode: RemoteServicesMode.LocalByok,
  });

  expect(config.serverModelMode).toBe(ServerModelMode.Disabled);
  expect(config.serverApiBaseUrl).toBe('http://127.0.0.1:8787');
  expect(isServerModelModeEnabled(config)).toBe(false);
  expect(areCloudRemoteFeaturesEnabled(config)).toBe(false);
});

test('allows an environment server URL override', () => {
  process.env.LOBSTERAI_SERVER_BASE_URL = 'http://localhost:9898/';

  const config = resolveRemoteServicesConfig({
    mode: RemoteServicesMode.SelfHosted,
  });

  expect(config.serverApiBaseUrl).toBe('http://localhost:9898');
  expect(config.portalBaseUrl).toBe('http://localhost:9898');
});
