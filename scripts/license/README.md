# Local License Tools

本目录只放内部 License 生成工具，不保存私钥。

## 生成 License

`generate-license.mjs` 从环境变量 `TOPVAN_LICENSE_PRIVATE_KEY_PEM` 读取 Ed25519 私钥，输出可导入客户端的 License JSON。

示例:

```powershell
$env:TOPVAN_LICENSE_PRIVATE_KEY_PEM = @'
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----
'@

node scripts/license/generate-license.mjs `
  --customer "Acme" `
  --plan standard `
  --seats 1 `
  --machine "<客户机器码，可选>" `
  --expiresAt "2026-12-31T23:59:59.000Z" `
  --out ".\licenses\acme.json"
```

注意:

- 私钥不得提交到 Git。
- 客户端只内置公钥并做签名校验。
- 正式发版前应替换 `src/main/libs/licenseManager.ts` 中的内置公钥。
