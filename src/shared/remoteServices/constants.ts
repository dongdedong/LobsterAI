export const RemoteServicesMode = {
  Official: 'official',
  SelfHosted: 'self-hosted',
  LocalByok: 'local-byok',
} as const;

export type RemoteServicesMode =
  (typeof RemoteServicesMode)[keyof typeof RemoteServicesMode];

export const ServerModelMode = {
  Official: 'official',
  ManagedProxy: 'managed-proxy',
  Disabled: 'disabled',
} as const;

export type ServerModelMode =
  (typeof ServerModelMode)[keyof typeof ServerModelMode];

export type RemoteServicesConfig = {
  mode?: RemoteServicesMode;
  serverModelMode?: ServerModelMode;
  serverApiBaseUrl?: string;
  portalBaseUrl?: string;
  docsBaseUrl?: string;
  downloadBaseUrl?: string;
  updateCheckUrl?: string;
  manualUpdateCheckUrl?: string;
  skillStoreUrl?: string;
  kitStoreUrl?: string;
  mcpMarketplaceUrl?: string;
  loginOvermindUrl?: string;
  htmlSharePublicBaseUrl?: string;
  userCommunityUrl?: string;
  serviceTermsUrl?: string;
};

export const OFFICIAL_REMOTE_SERVICES: Required<RemoteServicesConfig> = {
  mode: RemoteServicesMode.Official,
  serverModelMode: ServerModelMode.Official,
  serverApiBaseUrl: 'https://lobsterai-server.youdao.com',
  portalBaseUrl: 'https://lobsterai.youdao.com/portal#',
  docsBaseUrl: 'https://lobsterai.youdao.com/#/docs',
  downloadBaseUrl: 'https://lobsterai.youdao.com/#/download-list',
  updateCheckUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/update',
  manualUpdateCheckUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/update-manual',
  skillStoreUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/skill-store',
  kitStoreUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/kit-store',
  mcpMarketplaceUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/mcp-marketplace',
  loginOvermindUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/prod/login-url',
  htmlSharePublicBaseUrl: 'https://lobsterai-server.youdao.com/s',
  userCommunityUrl: 'https://lobsterai.youdao.com/#/about',
  serviceTermsUrl: 'https://c.youdao.com/dict/hardware/lobsterai/lobsterai_service.html',
};

export const TEST_REMOTE_SERVICES: Required<RemoteServicesConfig> = {
  ...OFFICIAL_REMOTE_SERVICES,
  serverApiBaseUrl: 'https://lobsterai-server.inner.youdao.com',
  portalBaseUrl: 'https://lobsterai.inner.youdao.com/portal#',
  downloadBaseUrl: 'https://lobsterai.inner.youdao.com/#/download-list',
  updateCheckUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/update',
  manualUpdateCheckUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/update-manual',
  skillStoreUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/skill-store',
  kitStoreUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/kit-store',
  mcpMarketplaceUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/mcp-marketplace',
  loginOvermindUrl: 'https://api-overmind.youdao.com/openapi/get/luna/hardware/lobsterai/test/login-url',
  htmlSharePublicBaseUrl: 'https://lobsterai-server.inner.youdao.com/s',
  userCommunityUrl: 'https://lobsterai.inner.youdao.com/#/about',
  serviceTermsUrl: 'https://c.youdao.com/dict/hardware/lobsterai/lobsterai_service.html',
};

export const LOCAL_BYOK_REMOTE_SERVICES: Required<RemoteServicesConfig> = {
  mode: RemoteServicesMode.LocalByok,
  serverModelMode: ServerModelMode.Disabled,
  serverApiBaseUrl: 'http://127.0.0.1:8787',
  portalBaseUrl: 'http://127.0.0.1:8787',
  docsBaseUrl: 'http://127.0.0.1:8787/docs',
  downloadBaseUrl: 'http://127.0.0.1:8787/download-list',
  updateCheckUrl: 'http://127.0.0.1:8787/catalog/update.json',
  manualUpdateCheckUrl: 'http://127.0.0.1:8787/catalog/update-manual.json',
  skillStoreUrl: 'http://127.0.0.1:8787/catalog/skill-store.json',
  kitStoreUrl: 'http://127.0.0.1:8787/catalog/kit-store.json',
  mcpMarketplaceUrl: 'http://127.0.0.1:8787/catalog/mcp-marketplace.json',
  loginOvermindUrl: 'http://127.0.0.1:8787/catalog/login-url.json',
  htmlSharePublicBaseUrl: 'http://127.0.0.1:8787/s',
  userCommunityUrl: 'http://127.0.0.1:8787/about',
  serviceTermsUrl: 'http://127.0.0.1:8787/service-terms',
};

const trimTrailingSlash = (value: string): string => value.trim().replace(/\/+$/, '');

const normalizeOptionalUrl = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const normalized = trimTrailingSlash(value);
  return normalized || undefined;
};

const readEnv = (name: string): string | undefined => {
  if (typeof process === 'undefined' || typeof process.env !== 'object') {
    return undefined;
  }
  return process.env[name];
};

const normalizeMode = (value: unknown): RemoteServicesMode | undefined => {
  if (value === RemoteServicesMode.SelfHosted || value === RemoteServicesMode.LocalByok || value === RemoteServicesMode.Official) {
    return value;
  }
  return undefined;
};

const normalizeServerModelMode = (
  value: unknown,
  mode: RemoteServicesMode,
): ServerModelMode => {
  if (value === ServerModelMode.ManagedProxy || value === ServerModelMode.Disabled || value === ServerModelMode.Official) {
    return value;
  }
  if (mode === RemoteServicesMode.LocalByok) {
    return ServerModelMode.Disabled;
  }
  if (mode === RemoteServicesMode.SelfHosted) {
    return ServerModelMode.ManagedProxy;
  }
  return ServerModelMode.Official;
};

export function resolveRemoteServicesConfig(
  input: unknown,
  options: { testMode?: boolean } = {},
): Required<RemoteServicesConfig> {
  const source = input && typeof input === 'object'
    ? input as RemoteServicesConfig
    : {};
  const mode = normalizeMode(source.mode) ?? RemoteServicesMode.LocalByok;
  const defaults = mode === RemoteServicesMode.LocalByok
    ? LOCAL_BYOK_REMOTE_SERVICES
    : options.testMode
      ? TEST_REMOTE_SERVICES
      : OFFICIAL_REMOTE_SERVICES;
  const serverApiBaseUrl = normalizeOptionalUrl(source.serverApiBaseUrl)
    ?? normalizeOptionalUrl(readEnv('LOBSTERAI_SERVER_BASE_URL'))
    ?? defaults.serverApiBaseUrl;
  const portalBaseUrl = normalizeOptionalUrl(source.portalBaseUrl)
    ?? (mode === RemoteServicesMode.SelfHosted ? serverApiBaseUrl : defaults.portalBaseUrl);
  const htmlSharePublicBaseUrl = normalizeOptionalUrl(source.htmlSharePublicBaseUrl)
    ?? (mode === RemoteServicesMode.SelfHosted ? `${serverApiBaseUrl}/s` : defaults.htmlSharePublicBaseUrl);
  const selfHostedCatalogUrl = (name: string) => `${serverApiBaseUrl}/catalog/${name}.json`;

  return {
    mode,
    serverModelMode: normalizeServerModelMode(source.serverModelMode, mode),
    serverApiBaseUrl,
    portalBaseUrl,
    docsBaseUrl: normalizeOptionalUrl(source.docsBaseUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? `${serverApiBaseUrl}/docs` : defaults.docsBaseUrl),
    downloadBaseUrl: normalizeOptionalUrl(source.downloadBaseUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? `${serverApiBaseUrl}/download-list` : defaults.downloadBaseUrl),
    updateCheckUrl: normalizeOptionalUrl(source.updateCheckUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('update') : defaults.updateCheckUrl),
    manualUpdateCheckUrl: normalizeOptionalUrl(source.manualUpdateCheckUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('update-manual') : defaults.manualUpdateCheckUrl),
    skillStoreUrl: normalizeOptionalUrl(source.skillStoreUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('skill-store') : defaults.skillStoreUrl),
    kitStoreUrl: normalizeOptionalUrl(source.kitStoreUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('kit-store') : defaults.kitStoreUrl),
    mcpMarketplaceUrl: normalizeOptionalUrl(source.mcpMarketplaceUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('mcp-marketplace') : defaults.mcpMarketplaceUrl),
    loginOvermindUrl: normalizeOptionalUrl(source.loginOvermindUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? selfHostedCatalogUrl('login-url') : defaults.loginOvermindUrl),
    htmlSharePublicBaseUrl,
    userCommunityUrl: normalizeOptionalUrl(source.userCommunityUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? `${serverApiBaseUrl}/about` : defaults.userCommunityUrl),
    serviceTermsUrl: normalizeOptionalUrl(source.serviceTermsUrl)
      ?? (mode === RemoteServicesMode.SelfHosted ? `${serverApiBaseUrl}/service-terms` : defaults.serviceTermsUrl),
  };
}

export function isServerModelModeEnabled(config: RemoteServicesConfig | undefined): boolean {
  const mode = resolveRemoteServicesConfig(config).serverModelMode;
  return mode !== ServerModelMode.Disabled;
}

export function areCloudRemoteFeaturesEnabled(config: RemoteServicesConfig | undefined): boolean {
  const mode = resolveRemoteServicesConfig(config).mode;
  return mode !== RemoteServicesMode.LocalByok;
}
