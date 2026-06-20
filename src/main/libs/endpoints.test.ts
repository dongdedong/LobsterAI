import { beforeEach, expect, test, vi } from 'vitest';

import { RemoteServicesMode, ServerModelMode } from '../../shared/remoteServices/constants';

vi.mock('electron', () => ({
  app: {
    isPackaged: true,
  },
}));

beforeEach(() => {
  vi.resetModules();
});

test('main endpoints default to local BYOK services before app_config is cached', async () => {
  const endpoints = await import('./endpoints');

  expect(endpoints.getServerApiBaseUrl()).toBe('http://127.0.0.1:8787');
  expect(endpoints.getUpdateCheckUrl()).toBe('http://127.0.0.1:8787/catalog/update.json');
  expect(endpoints.getSkillStoreUrl()).toBe('http://127.0.0.1:8787/catalog/skill-store.json');
  expect(endpoints.getMcpMarketplaceUrl()).toBe('http://127.0.0.1:8787/catalog/mcp-marketplace.json');
});

test('main endpoints use explicit self-hosted app_config services', async () => {
  const endpoints = await import('./endpoints');

  endpoints.refreshEndpointsTestMode({
    get: () => ({
      app: {
        testMode: false,
        remoteServices: {
          mode: RemoteServicesMode.SelfHosted,
          serverModelMode: ServerModelMode.ManagedProxy,
          serverApiBaseUrl: 'http://localhost:9898/',
        },
      },
    }),
  } as any);

  expect(endpoints.getServerApiBaseUrl()).toBe('http://localhost:9898');
  expect(endpoints.getKitStoreUrl()).toBe('http://localhost:9898/catalog/kit-store.json');
  expect(endpoints.getPortalTasksUrl()).toBe('http://localhost:9898/profile/detail?tab=tasks');
});

test('main endpoints only use Youdao URLs when official mode is explicit', async () => {
  const endpoints = await import('./endpoints');

  endpoints.refreshEndpointsTestMode({
    get: () => ({
      app: {
        testMode: false,
        remoteServices: {
          mode: RemoteServicesMode.Official,
        },
      },
    }),
  } as any);

  expect(endpoints.getServerApiBaseUrl()).toBe('https://lobsterai-server.youdao.com');
});
