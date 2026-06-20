import { expect, test } from 'vitest';

import { PlatformRegistry } from './constants';

test('backend-free MVP hides NetEase-family IM platforms from visible lists', () => {
  expect(PlatformRegistry.platforms).not.toContain('nim');
  expect(PlatformRegistry.platforms).not.toContain('netease-bee');
  expect(PlatformRegistry.platforms).not.toContain('popo');
  expect(PlatformRegistry.platformsByRegion('china')).not.toContain('nim');
  expect(PlatformRegistry.channelOptions().map(option => option.value)).not.toContain('nim');
});

test('hidden IM platforms remain resolvable for existing configs', () => {
  expect(PlatformRegistry.platformOfChannel('nim')).toBe('nim');
  expect(PlatformRegistry.platformOfChannel('moltbot-popo')).toBe('popo');
  expect(PlatformRegistry.platformOfChannel('netease-bee')).toBe('netease-bee');
});
