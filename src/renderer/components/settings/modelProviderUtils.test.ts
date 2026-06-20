import { expect, test } from 'vitest';

import { ProviderAuthType, ProviderName } from '../../../shared/providers';
import {
  buildProviderRecommendedConfig,
  classifyProviderConnectionFailure,
  hasProviderAuthConfigured,
  hasReadyProvider,
  isByokRecommendedProvider,
  type ProviderConfig,
  providerRequiresApiKey,
  type ProvidersConfig,
  resolveProviderSetupStatus,
} from './modelProviderUtils';

const providerConfig = (overrides: Partial<ProviderConfig> = {}): ProviderConfig => ({
  enabled: true,
  apiKey: '',
  baseUrl: 'https://api.example.com',
  models: [],
  ...overrides,
});

test('GitHub Copilot does not require a persisted API key', () => {
  expect(providerRequiresApiKey(ProviderName.Copilot)).toBe(false);
});

test('GitHub Copilot OAuth auth is tracked by authType instead of apiKey', () => {
  expect(hasProviderAuthConfigured(
    ProviderName.Copilot,
    providerConfig({ authType: ProviderAuthType.OAuth }),
  )).toBe(true);

  expect(hasProviderAuthConfigured(
    ProviderName.Copilot,
    providerConfig({ apiKey: 'legacy-short-token' }),
  )).toBe(false);
});

test('BYOK recommended providers highlight practical MVP choices', () => {
  expect(isByokRecommendedProvider(ProviderName.DeepSeek)).toBe(true);
  expect(isByokRecommendedProvider(ProviderName.Ollama)).toBe(true);
  expect(isByokRecommendedProvider(ProviderName.LmStudio)).toBe(true);
  expect(isByokRecommendedProvider(ProviderName.Youdaozhiyun)).toBe(false);
});

test('recommended provider config restores endpoint format and models without clearing credentials', () => {
  const config = buildProviderRecommendedConfig(
    ProviderName.DeepSeek,
    providerConfig({
      enabled: true,
      apiKey: 'sk-test',
      baseUrl: 'https://wrong.example.com',
      apiFormat: 'anthropic',
      models: [{ id: 'wrong-model', name: 'Wrong Model' }],
    }),
  );

  expect(config).toMatchObject({
    enabled: true,
    apiKey: 'sk-test',
    baseUrl: 'https://api.deepseek.com',
    apiFormat: 'openai',
  });
  expect(config?.models?.[0]).toMatchObject({
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
  });
});

test('recommended provider config resets coding plan and ignores non-recommended providers', () => {
  const qwenConfig = buildProviderRecommendedConfig(
    ProviderName.Qwen,
    providerConfig({
      apiKey: 'sk-test',
      codingPlanEnabled: true,
      baseUrl: 'https://custom.example.com',
      models: [{ id: 'coding-model', name: 'Coding Model' }],
    }),
  );

  expect(qwenConfig?.codingPlanEnabled).toBe(false);
  expect(qwenConfig?.baseUrl).toBe('https://dashscope.aliyuncs.com/apps/anthropic');

  expect(buildProviderRecommendedConfig(
    ProviderName.Youdaozhiyun,
    providerConfig({ apiKey: 'sk-test' }),
  )).toBeNull();
});

test('provider setup status explains the next required action', () => {
  expect(resolveProviderSetupStatus(
    ProviderName.DeepSeek,
    providerConfig({ apiKey: '', models: [{ id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash' }] }),
  )).toBe('missing-auth');

  expect(resolveProviderSetupStatus(
    ProviderName.Ollama,
    providerConfig({ enabled: true, models: [] }),
  )).toBe('missing-model');

  expect(resolveProviderSetupStatus(
    ProviderName.DeepSeek,
    providerConfig({ enabled: false, apiKey: 'sk-test', models: [{ id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash' }] }),
  )).toBe('disabled');

  expect(resolveProviderSetupStatus(
    ProviderName.DeepSeek,
    providerConfig({ enabled: true, apiKey: 'sk-test', models: [{ id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash' }] }),
  )).toBe('ready');
});

test('hasReadyProvider requires enabled auth and at least one model', () => {
  const providers = {
    [ProviderName.DeepSeek]: providerConfig({ enabled: false, apiKey: 'sk-test', models: [{ id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash' }] }),
    [ProviderName.Ollama]: providerConfig({ enabled: true, models: [] }),
    [ProviderName.LmStudio]: providerConfig({ enabled: true, models: [{ id: 'local-model', name: 'Local Model' }] }),
  } as unknown as ProvidersConfig;

  expect(hasReadyProvider(providers)).toBe(true);
});

test('connection failure classification maps common customer fixes', () => {
  expect(classifyProviderConnectionFailure(401, 'Incorrect API key')).toBe('auth');
  expect(classifyProviderConnectionFailure(404, 'not found')).toBe('base-url');
  expect(classifyProviderConnectionFailure(400, 'model does not exist')).toBe('model');
  expect(classifyProviderConnectionFailure(429, 'rate limit exceeded')).toBe('rate-limit');
  expect(classifyProviderConnectionFailure(undefined, 'ECONNREFUSED 127.0.0.1')).toBe('network');
  expect(classifyProviderConnectionFailure(500, 'server error')).toBe('unknown');
});
