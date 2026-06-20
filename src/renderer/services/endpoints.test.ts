import { afterEach, expect, test, vi } from 'vitest';

import { RemoteServicesMode } from '../../shared/remoteServices/constants';
import { configService } from './config';
import {
  getPortalInvitationUrl,
  getPortalPricingUrl,
  getPortalProfileUrl,
  getPortalRechargeUrl,
  PortalPricingKeyfrom,
} from './endpoints';

const mockTestMode = (testMode: boolean) => {
  vi.spyOn(configService, 'getConfig').mockReturnValue({
    app: {
      testMode,
      remoteServices: {
        mode: RemoteServicesMode.Official,
      },
    },
  } as ReturnType<typeof configService.getConfig>);
};

const mockRemoteServices = (remoteServices: { mode: RemoteServicesMode; serverApiBaseUrl?: string }) => {
  vi.spyOn(configService, 'getConfig').mockReturnValue({
    app: {
      testMode: false,
      remoteServices,
    },
  } as ReturnType<typeof configService.getConfig>);
};

afterEach(() => {
  vi.restoreAllMocks();
});

test('portal account urls use production base when test mode is disabled', () => {
  mockTestMode(false);

  expect(getPortalProfileUrl()).toBe('https://lobsterai.youdao.com/portal#/profile');
  expect(getPortalRechargeUrl()).toBe('https://lobsterai.youdao.com/portal#/');
  expect(getPortalInvitationUrl()).toBe('https://lobsterai.youdao.com/portal#/invitation');
});

test('portal account urls use test base when test mode is enabled', () => {
  mockTestMode(true);

  expect(getPortalProfileUrl()).toBe('https://lobsterai.inner.youdao.com/portal#/profile');
  expect(getPortalRechargeUrl()).toBe('https://lobsterai.inner.youdao.com/portal#/');
  expect(getPortalInvitationUrl()).toBe('https://lobsterai.inner.youdao.com/portal#/invitation');
});

test('portal pricing url can include html share keyfrom', () => {
  mockTestMode(false);

  expect(getPortalPricingUrl(PortalPricingKeyfrom.HtmlShare)).toBe(
    'https://lobsterai.youdao.com/portal#/pricing?keyfrom=html_share',
  );
});

test('portal account urls use local BYOK base by default', () => {
  vi.spyOn(configService, 'getConfig').mockReturnValue({
    app: { testMode: false },
  } as ReturnType<typeof configService.getConfig>);

  expect(getPortalProfileUrl()).toBe('http://127.0.0.1:8787/profile');
  expect(getPortalRechargeUrl()).toBe('http://127.0.0.1:8787/');
  expect(getPortalInvitationUrl()).toBe('http://127.0.0.1:8787/invitation');
});

test('portal account urls use self-hosted server base', () => {
  mockRemoteServices({
    mode: RemoteServicesMode.SelfHosted,
    serverApiBaseUrl: 'http://127.0.0.1:8787/',
  });

  expect(getPortalProfileUrl()).toBe('http://127.0.0.1:8787/profile');
  expect(getPortalRechargeUrl()).toBe('http://127.0.0.1:8787/');
  expect(getPortalInvitationUrl()).toBe('http://127.0.0.1:8787/invitation');
});

test('portal account urls use local BYOK defaults', () => {
  mockRemoteServices({
    mode: RemoteServicesMode.LocalByok,
  });

  expect(getPortalProfileUrl()).toBe('http://127.0.0.1:8787/profile');
  expect(getPortalRechargeUrl()).toBe('http://127.0.0.1:8787/');
  expect(getPortalInvitationUrl()).toBe('http://127.0.0.1:8787/invitation');
});
