/**
 * 集中管理所有业务 API 端点。
 * 后续新增的业务接口也应在此文件中配置。
 */

import { resolveRemoteServicesConfig } from '../../shared/remoteServices/constants';
import { configService } from './config';

export const isTestModeEnabled = () => {
  return configService.getConfig().app?.testMode === true;
};

const getRemoteServices = () => resolveRemoteServicesConfig(
  configService.getConfig().app?.remoteServices,
  { testMode: isTestModeEnabled() },
);

// 自动更新
export const getUpdateCheckUrl = () => getRemoteServices().updateCheckUrl;

// 手动检查更新
export const getManualUpdateCheckUrl = () => getRemoteServices().manualUpdateCheckUrl;

export const getFallbackDownloadUrl = () => getRemoteServices().downloadBaseUrl;

export const getDocsBaseUrl = () => getRemoteServices().docsBaseUrl;

// Skill 商店
export const getSkillStoreUrl = () => getRemoteServices().skillStoreUrl;

// Kit 商店
export const getKitStoreUrl = () => getRemoteServices().kitStoreUrl;

// MCP marketplace
export const getMcpMarketplaceUrl = () => getRemoteServices().mcpMarketplaceUrl;

// 登录地址
export const getLoginOvermindUrl = () => getRemoteServices().loginOvermindUrl;

export const getUserCommunityUrl = () => getRemoteServices().userCommunityUrl;

export const getServiceTermsUrl = () => getRemoteServices().serviceTermsUrl;

const getPortalBase = () => getRemoteServices().portalBaseUrl;

export const PortalPricingKeyfrom = {
  HtmlShare: 'html_share',
} as const;

export type PortalPricingKeyfrom =
  (typeof PortalPricingKeyfrom)[keyof typeof PortalPricingKeyfrom];

export const getPortalLoginUrl = () => `${getPortalBase()}/login`;
export const getPortalPricingUrl = (keyfrom?: PortalPricingKeyfrom) => (
  `${getPortalBase()}/pricing${keyfrom ? `?keyfrom=${encodeURIComponent(keyfrom)}` : ''}`
);
export const getPortalProfileUrl = () => `${getPortalBase()}/profile`;
export const getPortalRechargeUrl = () => `${getPortalBase()}/`;
export const getPortalInvitationUrl = () => `${getPortalBase()}/invitation`;
