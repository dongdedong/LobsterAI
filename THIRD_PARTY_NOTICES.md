# Third-Party Notices and Commercialization Review

Last updated: 2026-06-20

This document is an engineering inventory for the internal commercial fork of LobsterAI. It is not legal advice and should be reviewed with legal/compliance before external distribution.

## Product Positioning

The current MVP is positioned as a local-first desktop AI Agent:

- no mandatory user login;
- no hosted model proxy or token resale;
- users bring their own model provider API keys;
- local License activation is used for product authorization;
- cloud-only upstream capabilities are disabled, hidden, or treated as legacy integrations unless explicitly reviewed.

## Core Open-Source Components

The application depends on a typical Electron desktop stack. Before commercial distribution, keep the dependency license scan in CI and preserve upstream notices required by each package.

| Area | Examples | Review note |
| --- | --- | --- |
| Desktop shell | Electron, electron-builder | Check packaging, auto-update, code-signing, and bundled runtime notices. |
| Frontend | React, Redux Toolkit, Vite, TypeScript, Tailwind CSS | Preserve licenses from npm dependencies in release artifacts where required. |
| Local storage | SQLite, better-sqlite3 | Confirm native binary redistribution requirements for each target platform. |
| Markdown and preview | react-markdown, Mermaid, DOMPurify, KaTeX, highlight.js family packages | Keep security configuration for HTML/SVG previews and preserve notices. |
| Agent runtime | OpenClaw runtime and OpenClaw plugins | Review OpenClaw license, plugin licenses, runtime bundling terms, and any network download behavior. |
| Built-in skills | SKILLs directory and bundled helper runtimes | Review each skill dependency separately, especially Python and Node packages installed at runtime. |

## Legacy or Disabled Upstream Integrations

The upstream project still contains code or package metadata for integrations that are not part of the Local BYOK MVP default surface. Do not market, enable, or sell these features until the dependency, license, and deployment model is reviewed.

| Integration | Current MVP status | Required before commercial use |
| --- | --- | --- |
| Youdao/LobsterAI hosted services | Disabled or bypassed by Local BYOK mode | Replace with self-owned service or keep explicitly disabled. |
| Youdao model proxy and quota APIs | Not required for MVP | Do not re-enable unless billing, privacy, and service ownership are designed. |
| Youdao provider gateway | Hidden from normal provider selection | Review provider terms and customer data flow before use. |
| Youdao Note skill | Disabled by default | Review API terms, CLI distribution, account dependency, and customer data flow before enabling. |
| NetEase IM / NetEase Bee / POPO | Hidden or treated as legacy integration | Review SDK/plugin licenses, server dependencies, accounts, privacy, and support responsibility. |
| Upstream community/download/star links | Removed from internal-facing README files | Replace with self-owned website, support channel, and release process when available. |
| Online email API Key console | Not bundled in MVP | Provide a self-owned email gateway service or remove the online API Key workflow. |
| Remote marketplace/update/config services | Not part of the Local BYOK MVP default flow | Replace with self-owned release and plugin distribution infrastructure before enabling. |

## Release Checklist

Before shipping an external build:

1. Run a dependency license scan for npm, bundled OpenClaw runtime, plugins, Python runtime, and skill dependencies.
2. Confirm `README.md`, `README_zh.md`, package metadata, About page, update links, support links, and privacy/terms links no longer point to upstream vendor resources.
3. Confirm Local BYOK remains the default mode and no missing provider configuration silently falls back to hosted upstream model services.
4. Confirm hidden legacy integrations are not visible in Settings, scheduled-task delivery choices, onboarding, or marketing documentation.
5. Replace development License public keys with production keys and verify the private signing key is not shipped with the client.
6. Prepare self-owned user support, release download, privacy policy, service terms, and issue intake channels.
