import { app } from 'electron';

import { HtmlSharePublicRoute } from '../../shared/htmlShare/constants';
import {
  type RemoteServicesConfig,
  resolveRemoteServicesConfig,
} from '../../shared/remoteServices/constants';
import type { SqliteStore } from '../sqliteStore';

let cachedTestMode: boolean | null = null;
let cachedRemoteServices: RemoteServicesConfig | undefined;

/**
 * Read testMode from store and cache it.
 * Call once at startup and again whenever app_config changes.
 */
export function refreshEndpointsTestMode(store: SqliteStore): void {
  const appConfig = store.get<any>('app_config');
  cachedTestMode = appConfig?.app?.testMode === true;
  cachedRemoteServices = appConfig?.app?.remoteServices;
}

/**
 * Whether the app is in test mode.
 * Uses cached value after init; falls back to !app.isPackaged before init.
 */
export const isTestModeEnabled = (): boolean => {
  return cachedTestMode ?? !app.isPackaged;
};

/**
 * Server API base URL — switches based on testMode.
 * Used for auth exchange/refresh, models, proxy, etc.
 */
export const getServerApiBaseUrl = (): string => {
  return resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).serverApiBaseUrl;
};

export const getHtmlSharePublicBaseUrl = (): string => {
  const remoteServices = resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  });
  return remoteServices.htmlSharePublicBaseUrl || `${getServerApiBaseUrl()}${HtmlSharePublicRoute.Root}`;
};

export const getUpdateCheckUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).updateCheckUrl
);

export const getManualUpdateCheckUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).manualUpdateCheckUrl
);

export const getFallbackDownloadUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).downloadBaseUrl
);

export const getSkillStoreUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).skillStoreUrl
);

const getPortalBase = (): string => resolveRemoteServicesConfig(cachedRemoteServices, {
  testMode: isTestModeEnabled(),
}).portalBaseUrl;

export const getPortalTasksUrl = (): string => `${getPortalBase()}/profile/detail?tab=tasks`;

export const getKitStoreUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).kitStoreUrl
);

export const getMcpMarketplaceUrl = (): string => (
  resolveRemoteServicesConfig(cachedRemoteServices, {
    testMode: isTestModeEnabled(),
  }).mcpMarketplaceUrl
);
