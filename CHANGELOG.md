# Changelog

## [2.8.2](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.8.1...v2.8.2) (2026-08-11)


### Bug Fixes

* drop the mcp-server files the reconcile merge restored (TAB-1196) ([74d5e77](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/74d5e77c9d997f959265e61a96d49c8350a0c9b9))


### Chores

* reconcile next with main after 2.8.1 ([d7c9e78](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d7c9e78cf2760f17df32eb32b0dc76ab1f487a49))
* sync release 2.8.1 to next ([8c605b0](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8c605b0b6f28e2cd4690105d457f20b6fa71c64d))

## [2.8.1](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.8.0...v2.8.1) (2026-08-10)


### Chores

* sync release 2.8.0 to next ([83d6bde](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/83d6bde07170ec9a3fca53509ea7e8ba39937958))

## [2.8.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.7.1...v2.8.0) (2026-08-10)


### Features

* **ci:** cut releases automatically, without a pull request (TAB-1192) ([#37](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/37)) ([bdb3636](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bdb3636c38829a8e3e229fdb6500354765602999))
* **ci:** cut releases automatically, without a pull request (TAB-1192) ([#38](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/38)) ([903799e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/903799ec644d54cc0855ca6018d69d610e23942f))


### Bug Fixes

* **ci:** assign the release issue to whoever pushed (TAB-1192) ([#31](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/31)) ([a3819d8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a3819d82f6cd99872fba64481fb2639d015ae5f5))
* **ci:** assign the release issue to whoever pushed (TAB-1192) ([#32](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/32)) ([926bd10](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/926bd104d7ddbfa6fdddfb18d0b51cbf0f6ca888))
* **ci:** make the release pipeline usable end to end (TAB-1192) ([#28](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/28)) ([46c6740](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/46c674019fb2e1f301f62b7be28053aca0844874))
* **ci:** make the release pipeline usable end to end (TAB-1192) ([#29](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/29)) ([f69e0fb](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/f69e0fb13f9f25fb05db1ba2d51572be9bef2d7b))
* **ci:** merge the release branch onto main instead of pushing it (TAB-1192) ([#39](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/39)) ([d31fdb7](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d31fdb7ffaad3bf25b1587bb1fa4ad8a191a75ee))
* **ci:** merge the release branch onto main instead of pushing it (TAB-1192) ([#40](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/40)) ([5534cfe](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5534cfeb3255c3b18c9d977255e7a05316ddbc35))
* **ci:** publish only the root package to npm (TAB-1192) ([#35](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/35)) ([cdef870](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cdef87016bda296214c4749c9adeeec32722701a))
* **ci:** publish only the root package to npm (TAB-1192) ([#36](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/36)) ([252e08c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/252e08cad798d5e9314ca1b43c03fe02fc9da828))
* **ci:** stop the sync skipping on a matching manifest version (TAB-1192) ([#49](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/49)) ([5c4c5d9](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5c4c5d98e0a7d35bee6b4937b3d0c78df9a33946))
* **ci:** stop the sync skipping on a matching manifest version (TAB-1192) ([#50](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/50)) ([6860d7f](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/6860d7f4d68fef2e997902bcb4558bdc418b567c))
* **ci:** sync every release-managed file back to next (TAB-1192) ([#47](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/47)) ([95a1ba8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/95a1ba8b241d1380769c46707d4f3bc3a3c1ad31))
* **ci:** use --add-assignee when editing the release issue (TAB-1192) ([#33](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/33)) ([43da4b8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/43da4b83c0dad0189704e481ce4c54f00cf3f7e5))
* **ci:** use --add-assignee when editing the release issue (TAB-1192) ([#34](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/34)) ([0a754fe](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0a754fe5f104d81591e2c92fd261e0d376c28785))


### Reverts

* **ci:** restore the issue-driven release flow (TAB-1192) ([#41](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/41)) ([cb93203](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cb932038a3a51fa8944fa9e2c7af4e5a18ba8939))
* **ci:** restore the issue-driven release flow (TAB-1192) ([#42](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/42)) ([f0f6463](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/f0f6463ba726a191deee7fab838d58ed97f48249))


### Chores

* sync release 2.7.1 to next ([97ba376](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/97ba376ba230db340cd6db85fb15f0b6158d42c0))
* sync release manifest to next (2.7.1) ([0660d96](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0660d96e0cf422df29f763497881247a5cbddb36))


### Documentation

* **ci:** point the release issue at the release script (TAB-1192) ([#44](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/44)) ([477eb92](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/477eb92935b5a7710b45e58d950e1925e4837c57))
* **ci:** point the release issue at the release script (TAB-1192) ([#45](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/45)) ([eb2a8a2](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/eb2a8a203ea1230314e80495ba4a1ff7286274ae))

## [2.7.1](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.7.0...v2.7.1) (2026-08-10)


### Bug Fixes

* **ci:** build release-please with pnpm instead of npm -g (TAB-1192) ([#24](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/24)) ([7cb4c29](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7cb4c29327b399b9f30be808e73fd675da42f190))
* **ci:** build release-please with pnpm instead of npm -g (TAB-1192) ([#25](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/25)) ([0db5767](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0db576783c00d62d96d632c1b9b2e517b98039e4))
* **ci:** build release-please with pnpm instead of npm -g (TAB-1192) ([#25](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/25)) ([2dcbd45](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2dcbd458d50f55954e8abb402a2f47a40a18750c))
* **ci:** install pnpm directly for the release-please build (TAB-1192) ([#26](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/26)) ([8f13833](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8f13833566addeb0c0353e3a6bb998203023e4cd))
* **ci:** install pnpm directly for the release-please build (TAB-1192) ([#27](https://github.com/Mozilla-Ocho/tabstack-typescript/issues/27)) ([2b43b76](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2b43b7641e32d18b7c08094edb1852c5921619f7))

## 2.7.0 (2026-07-17)

Full Changelog: [v2.6.1...v2.7.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.6.1...v2.7.0)

### Features

* **api:** api update ([9e4dcca](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/9e4dcca4cb35a53e127287a4670073ff6e5df6bd))
* **api:** manual updates ([b2d94be](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b2d94be2d1c7ff56b941dcefad473441eb81c9d2))
* **automate:** expose trusted_hostnames and unsafe_mode (TAB-980) ([7b9f402](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7b9f40295226992653113ae8a749c12e1b3286b1))
* **stlc:** configurable CI runner and private-production-repo support in workflow templates ([baf877a](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/baf877a49514cdeae2ee6adddca9d644dcc8d60e))
* TAB-991 Add content (main/full) param to /extract/markdown ([9f407c5](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/9f407c56f093f323cbea60b05c4f59f9b87ad948))


### Bug Fixes

* **ci:** bump @arethetypeswrong/cli to ^0.18.0 and run CI workflows on Node 24 ([eb255b8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/eb255b8c10eaac8b88e0c95c13bcb39696fa061d))
* **client:** send content-type header for requests with an omitted optional body ([e805738](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e805738dab499a6dcc6639661732f35836081c6d))
* **typescript:** upgrade tsc-multi so that it works with Node 26 ([209e0a8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/209e0a8af0ddcc2f24b28ec7aaf37d5322736ba2))


### Chores

* configure new SDK language ([52e286e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/52e286e1df678e34f17c1db802e730ed4623734a))
* redact api-key headers in debug logs ([bca22fc](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bca22fc3f0b423fe733ebbe0cbf98c29ab4f390b))
* **tests:** remove redundant File import ([bfbcf1c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bfbcf1cab6b5cc6694d6fe04dba17683d212284b))


### Documentation

* **generate:** remove apostrophe from instructions example ([6cadd20](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/6cadd2057bd1dfd85afe616f6efd37ec5029beaf))
* update http mcp docs ([5f803be](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5f803bed938816448ef059e184d02d6f880d1faf))

## 2.6.1 (2026-05-05)

Full Changelog: [v2.6.0...v2.6.1](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.6.0...v2.6.1)

### Features

* **api:** add endpoint specfic timeouts ([4d6bd2e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/4d6bd2ec28d2424f239fd7fc763e0ed394f43a51))
* **api:** manual updates ([cc20909](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cc209097670fa44ec405ed1740681d4a12f50586))
* **automate:** emit task:trace_context SSE event with trace ID ([51cc989](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/51cc9894ca8b828dcfe5413e3cee66384b071149))
* support setting headers via env ([dc80807](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/dc80807af38c51ce4a041a6ba331c62897aace6d))


### Chores

* avoid formatting file that gets changed during releases ([8bcebec](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8bcebec347f5b03762e7ff725a3c19a4425c0d3b))
* **format:** run eslint and prettier separately ([0d94d58](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0d94d58968327fc93081582f0e4aa52c73ef3a77))
* **internal:** codegen related update ([8ee7235](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8ee7235bb02f5696aa8f0682b5c91d18a9755eac))

## 2.6.0 (2026-04-24)

Full Changelog: [v2.5.0...v2.6.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.5.0...v2.6.0)

### Features

* **api:** api update ([ef8a219](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ef8a219a966c66336a7004779fa9048ff2378da4))
* **codegen:** consume Pilo's AutomateStreamEvent as the /automate SSE root ([2375325](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/23753256ab2fbc0b786654a43219ac42b7e2bcd8))


### Chores

* **formatter:** run prettier and eslint separately ([e90f0c4](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e90f0c4e0ec6512ea7a72c1f3d9a5e2ef01a08ef))
* restructure docs search code ([cb96f26](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cb96f26480e7998a5ca6d64fb3b4f11e7783083f))

## 2.5.0 (2026-04-22)

Full Changelog: [v2.4.0...v2.5.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.4.0...v2.5.0)

### Features

* **api:** api update ([218e58b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/218e58b5d354ade8b263ce924ec7815d5eebf3e2))
* **api:** api update ([0657737](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0657737690e756d57b7aa9dabec4520589afecdf))


### Bug Fixes

* **codegen:** OAS 3.0 compliance + local Spectral lint + Stainless PR check ([a711498](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a71149850369e87496944f5477760360356d08c9))
* **codegen:** reduce Stainless variant-naming and ambiguity warnings ([5ecb272](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5ecb272a1be18fe081425b9bcd12e9c1b3acbd2d))


### Chores

* **internal:** more robust bootstrap script ([bace454](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bace454f2e0ee23bf26bcf753e7cbd357020f4b9))
* **internal:** update docs ordering ([0237c98](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0237c98853b43e6be78840a1d11276dba6569956))


### Documentation

* **research:** correct default mode from balanced to fast ([a364abc](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a364abc7c49812373d05a6af2be6df677d844cd3))

## 2.4.0 (2026-04-09)

Full Changelog: [v2.3.0...v2.4.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.3.0...v2.4.0)

### Features

* **api:** add input endpoint ([0dd1d54](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0dd1d543a21bbc5895ebbb15dce8d9a74750f417))
* **api:** api update ([49e2089](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/49e20893285a132e4c7d30deb0854784bb03d870))
* **api:** api update ([e80bcd1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e80bcd176eba011e108a8ee7faec4dda89042fdb))
* **api:** better handling of SSE events ([d3a2f86](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d3a2f86224eb86714757098595aa01fcbcb09b83))


### Bug Fixes

* **internal:** gitignore generated `oidc` dir ([67f4b90](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/67f4b908ec72ed6743c230097c385b282cde1513))


### Chores

* **ci:** escape input path in publish-npm workflow ([b54ca13](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b54ca13e9e7e5e1440dac40eba80df491dd554e6))
* **ci:** skip lint on metadata-only changes ([8045090](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/80450904c6fc0c372a5640c66486a53d907004f6))
* configure new SDK language ([460c12d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/460c12d23c3823c332d0e82992692e9e76ab40bc))
* **internal:** codegen related update ([a5ffb49](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a5ffb494a8e02757c296abb0c78b9a61a19babf9))
* **internal:** fix MCP server import ordering ([1356d84](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1356d8419ef32c3574cb577db317eec9154ab248))
* **internal:** fix MCP server TS errors that occur with required client options ([dc101e6](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/dc101e680b98de3015b6961ce4422e1916c4dd35))
* **internal:** improve local docs search for MCP servers ([3cc5b5d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/3cc5b5d56dbc3d97449adce247540fa69e2d2abc))
* **internal:** improve local docs search for MCP servers ([cc53f03](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cc53f03108626fd3499f1b261d2c8937a19e5176))
* **internal:** make generated MCP servers compatible with Cloudflare worker environments ([0b40f23](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/0b40f2348a21ab9c46de5aee88c127f84abdb574))
* **internal:** show error causes in MCP servers when running in local mode ([c99e370](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c99e370949cd7096e95ca5fc2c38dd6148874ec0))
* **internal:** support custom-instructions-path flag in MCP servers ([d7a4831](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d7a483115a333a931d79b85426cfa134568622a4))
* **internal:** support local docs search in MCP servers ([e39e4f1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e39e4f1b4706882c3df568ee09ba65a7d89e306a))
* **internal:** support type annotations when running MCP in local execution mode ([3df46aa](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/3df46aacd5d3d75f0b85e9383c0aa15123355e88))
* **internal:** support x-stainless-mcp-client-envs header in MCP servers ([abc70ae](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/abc70ae644aa155d9aec1cdae30b66a0058e3089))
* **internal:** support x-stainless-mcp-client-permissions headers in MCP servers ([75771cc](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/75771ccf2387de035bb5245ae88c01cad42599e5))
* **internal:** tweak CI branches ([2f9d806](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2f9d80699ca3017d3aece72fd910bede6f55dd83))
* **internal:** update gitignore ([c189c03](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c189c03dec1dcd2464582e0de38edd38633c0f7d))
* **internal:** update lockfile ([e015573](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e0155732b83051aa81583e4093b6d7f50628d0c3))
* **mcp-server:** add support for session id, forward client info ([ffbe6ff](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ffbe6ffb9caee39450a6e5fd11b81eebe623b836))
* **mcp-server:** increase local docs search result count from 5 to 10 ([b80ae81](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b80ae815e3e3d3c43f17b0e118e43151a7eadc5a))
* **mcp-server:** log client info ([356ec4e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/356ec4e5e8d04ab49fab836c1cfe42294a65bab1))

## 2.3.0 (2026-03-12)

Full Changelog: [v2.2.0...v2.3.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.2.0...v2.3.0)

### Features

* **api:** api update ([a317a25](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a317a25bf389eac00d89eb6319b9c655633f93b0))
* **api:** api update ([68dedea](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/68dedea3f63a130a4ec4f003ffe2c0a7094a67e9))
* **mcp:** add an option to disable code tool ([e035fab](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e035fab3d7958615a2494e7f2af76efd11a3d372))


### Bug Fixes

* **client:** preserve URL params already embedded in path ([23a779a](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/23a779ab3ada87312a16d97f765394e307696de3))
* **docs/contributing:** correct pnpm link command ([bce077a](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bce077a36e0564b58893a64d8caa122e33837145))
* fix request delays for retrying to be more respectful of high requested delays ([db0f369](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/db0f369ed237fabc9679a6d2ddd53f75cd1e182f))
* **mcp:** initialize SDK lazily to avoid failing the connection on init errors ([72b9188](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/72b918846ca3f09176cf22c3d0153ab55f2b579a))
* **mcp:** update prompt ([a2b5846](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a2b5846ba90bea6bb25fcc4aa388c2fb6d14248b))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([4ac3cec](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/4ac3cec643e664963afc983863726a600859d15c))
* **internal/client:** fix form-urlencoded requests ([5a04f93](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5a04f93853a1ba336071a338f5cc869b284f933b))
* **internal:** allow setting x-stainless-api-key header on mcp server requests ([6ad1894](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/6ad189492609ec54e65f5bc47c50ff6ed1eb4fd0))
* **internal:** cache fetch instruction calls in MCP server ([954937b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/954937b7602d99d7274e3b0cce65f5be6120accb))
* **internal:** codegen related update ([1d4da95](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1d4da955188aea8cdf0bc4bb41822c56209ca83d))
* **internal:** codegen related update ([35e1593](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/35e1593d93b880da34f7c3f8cd05823eff2713ff))
* **internal:** codegen related update ([586b6db](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/586b6dbd3342099ff7b03a8f0e5e829c5a8130dd))
* **internal:** codegen related update ([53ce0f2](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/53ce0f2ab49aa2ea8a603cb44c29e9551cd6eb20))
* **internal:** codegen related update ([ee5f3ac](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ee5f3ac5c8be9b00b2bdc93d7db39e96994150ad))
* **internal:** codegen related update ([bd495f2](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bd495f25497128ca0ae005e56db389a435444d5b))
* **internal:** codegen related update ([fc8be59](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/fc8be59536c75aa08640564a7f321efb90ca54d0))
* **internal:** codegen related update ([a52cc2d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a52cc2d9372aefad6b44a90081d3f839a21931e7))
* **internal:** codegen related update ([292480f](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/292480fe3a2c1cca11a8c8c2cf43dfaafdf6092f))
* **internal:** codegen related update ([9e14588](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/9e14588d99576d8ae1309aef2d34c5198d4bd2f2))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([1169354](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1169354a4b0050e94f5d6aa0cbe7ecb270e1f3a1))
* **internal:** fix MCP Dockerfiles so they can be built without buildkit ([ae04196](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ae041969fbe290d2b1780ebfa6038b3f5a2d8152))
* **internal:** improve layout of generated MCP server files ([c58a68b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c58a68b63e99a912145bb8f500d62b75a71206b4))
* **internal:** improve reliability of MCP servers when using local code mode execution ([91b8834](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/91b88344fdda8ea65d72656b8506fc18121d90cf))
* **internal:** make MCP code execution location configurable via a flag ([82cb709](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/82cb7093f430bded4f0b766eb59e5ce835165d0a))
* **internal:** move stringifyQuery implementation to internal function ([d1d7fd6](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d1d7fd6fecb6d1ba751fafa62ee85e6a13854f90))
* **internal:** remove mock server code ([e3031c1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e3031c1d4ff2df58e705265020b8022bb8093c65))
* **internal:** switch MCP servers to use pino for logging ([de3ccaa](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/de3ccaa64facf2d6b94d876dd3f61131182933ed))
* **internal:** update dependencies to address dependabot vulnerabilities ([188fc1d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/188fc1d86ecdb5e9542dfc53de8913f99bbb564c))
* **internal:** update lock file ([53ee472](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/53ee472017b775b4d5e00c51708be93946db46e6))
* **internal:** upgrade @modelcontextprotocol/sdk and hono ([d551a75](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d551a75163ffcb1b980a078ba71c73c0b0d56028))
* **internal:** upgrade pnpm version ([8930f4d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8930f4df10524deabe853d4e3ad4bc6cfcac7978))
* **internal:** use x-stainless-mcp-client-envs header for MCP remote code tool calls ([fedb62d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/fedb62d92b73485bf42f556367cd9da76294fadb))
* **mcp-server:** improve instructions ([b289817](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b289817e9db31895f028d4516342f665d298b89b))
* **mcp-server:** return access instructions for 404 without API key ([a2dd9ad](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a2dd9ad5860e24f02c4c41f6506a0b63879a195a))
* **mcp:** correctly update version in sync with sdk ([c4aa274](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c4aa27422d75b0e99483b33da0c639d84f96b21b))
* **mcp:** forward STAINLESS_API_KEY to docs search endpoint ([431193b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/431193bc79ae1b08b078abd7a597b865ce7d1f3b))
* **test:** update skip reason message ([09749f8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/09749f8208467f9045640f0404dd6b16400477b8))
* update mock server docs ([1246f16](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1246f1603afe6369a50b93cc3cfdb8497c600b06))

## 2.2.0 (2026-02-11)

Full Changelog: [v2.1.0...v2.2.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.1.0...v2.2.0)

### Features

* **api:** rename mcp package ([8f751c1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/8f751c172a3fc083c960dcf65a58b5d956b242b8))
* **mcp:** add initial server instructions ([76df25d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/76df25dcfeb028c72827de673a5a7bd19016922f))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([3787e65](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/3787e6510eca7abbab31bef59c8eb40bfe9d5cd3))
* **client:** avoid removing abort listener too early ([01fbcb7](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/01fbcb7279e4548e97443c630d317bd9be0e33c8))


### Chores

* **client:** do not parse responses with empty content-length ([d8f362e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d8f362e1e982f360415dcf58527f61a43083dd23))
* **client:** restructure abort controller binding ([b24c62d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b24c62de83fdab4fb2629e804e4b198ccf7bf70c))
* **internal:** add health check to MCP server when running in HTTP mode ([6da8c3d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/6da8c3d39b6fe36314e35d3e965bc78f330cd82d))
* **internal:** allow basic filtering of methods allowed for MCP code mode ([bbd13e8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bbd13e8c064dd5b1ad04a2679b4bd2f58e8b1325))
* **internal:** always generate MCP server dockerfiles and upgrade associated dependencies ([e4af05e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e4af05e4b5fdaa80c2b31f198bb945af8a180336))
* **internal:** avoid type checking errors with ts-reset ([06b5dd5](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/06b5dd5e033b6013936aa8aefcbb76a13dd1426d))
* **internal:** refactor flag parsing for MCP servers and add debug flag ([724abd9](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/724abd9e2a006ebbc0953c7435523a0449ce26c2))
* **internal:** support oauth authorization code flow for MCP servers ([56ee267](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/56ee267e71361ec6e9c894e3392a2ff6125fa493))
* **internal:** upgrade pnpm ([9d104e8](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/9d104e8e37f7596e2f2e0173b791de0a1355a37f))

## 2.1.0 (2026-01-30)

Full Changelog: [v2.0.0...v2.1.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v2.0.0...v2.1.0)

### Features

* **api:** add research ([5873cfe](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5873cfe55c4ed6e068176adb94831e557e0bb5a8))
* **api:** api update ([a04f995](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a04f995a9709f897a8fb2e365de7f208dbc300e8))
* **api:** api update ([d31ed03](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d31ed03ac69e83151ef1ecee8333b5c1107a7174))
* **api:** api update ([513ef13](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/513ef13b0078078a682487ce2988e960ce4e82fd))
* **api:** api update ([9d55ae9](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/9d55ae9d896cd30f1c676ff8842e08507a2fca57))


### Bug Fixes

* **docs:** fix mcp installation instructions for remote servers ([7883a07](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7883a07ff822b5e5d2da911b86c2bf4b2e841f6a))
* **mcp:** allow falling back for required env variables ([b7c0610](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b7c06105d5fd10e1d86a7c30b41fd83637eac418))


### Chores

* **ci:** upgrade `actions/github-script` ([f28ba6c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/f28ba6ca3e6c87afdcc772c2472cad63e4daec07))
* **internal:** codegen related update ([098880e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/098880edef54eb2f94fb7513e9f2dec00ecc24af))
* **internal:** codegen related update ([267c301](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/267c301617478b6cba0e5026271607be105f6832))
* **internal:** update `actions/checkout` version ([ed7bede](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ed7bede4754176ac8df84fe8ce4ed05844e290d6))
* **mcp:** up tsconfig lib version to es2022 ([4cdb14d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/4cdb14db691dc757dc4b714caf997f1a7825bdcf))

## 2.0.0 (2026-01-16)

Full Changelog: [v0.0.1...v2.0.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v0.0.1...v2.0.0)

### ⚠ BREAKING CHANGES

* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.
* **mcp:** remove deprecated tool schemes
* **mcp:** **Migration:** To migrate, simply modify the command used to invoke the MCP server. Currently, the only supported tool scheme is code mode. Now, starting the server with just `node /path/to/mcp/server` or `npx package-name` will invoke code tools: changing your command to one of these is likely all you will need to do.

### Features

* **api:** api update ([17d6472](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/17d6472cbb29b51dad1688e424a51a69e7e50e29))
* **api:** api update ([c6d611b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c6d611b091325741118bca143fd8c928bc4f67d8))
* **api:** api update ([2771086](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/27710864f30c53eb23f5283a1bd3f50e66b9a610))
* **api:** api update ([6f16232](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/6f16232aadc93c286963e3f6facc9118e308a531))
* **api:** config oidc publishing ([7b841ef](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7b841ef388bab0a38c1c8b74dd8ecc380cbf647b))
* **api:** config oidc publishing ([2e333b3](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2e333b37f495e80108f153d8a9de41c6e783b4fc))
* **api:** manual updates ([f661ac2](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/f661ac2f0fbc9482bcb496728c16bbe45699ad43))
* **api:** manual updates ([7335a65](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7335a656be53b43d8fd55d33dfd4511d80b4dbdc))
* **api:** manual updates ([d31b0ab](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d31b0ab1c5c3e8c4996ac25fdfac39983690e1d8))
* **api:** manual updates ([63942f4](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/63942f43ffe8babbfe091decb06866868a08e27b))
* **api:** npm package name ([1ed323a](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1ed323afe994c872c16f671a5811dcb766074dd2))


### Bug Fixes

* **mcp:** correct code tool api output types ([1605549](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/16055493e67debbdb8eee01b9998b3e40adc7224))
* **mcp:** correct code tool api output types ([78726dc](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/78726dcbad8e9fe79fa40544821e77c10d8f3c8d))
* **mcp:** fix env parsing ([1c0f081](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1c0f081b428be951ca07a445b2a141132d67b42a))
* **mcp:** fix env parsing ([d778a28](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d778a28c7d39bad61fd259942ed3eada7fbdba5d))
* **mcp:** fix options parsing ([340f402](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/340f402c1f4555b364b1c89cc68cbdf56abdb9de))
* **mcp:** fix options parsing ([779a682](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/779a6821b91d13d1741a74f507a6cca6737acad6))
* **mcp:** pass base url to code tool ([e2cd493](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e2cd49316804dc520e0b5abdf570f83c0be4e99d))
* **mcp:** pass base url to code tool ([442ae79](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/442ae7922b6b490637736135c3ca268181a90105))
* **mcp:** update code tool prompt ([982ca77](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/982ca775caec3c7137384fd51cc65663e5bf3d02))
* **mcp:** update code tool prompt ([59601ef](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/59601ef36f1e4099f2b198d2600998eda6d5f911))


### Chores

* break long lines in snippets into multiline ([137d85d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/137d85d1d287f66312464f4c17d6e8152b5e2a95))
* break long lines in snippets into multiline ([561e131](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/561e131f667c90905137c6e17146dd6519bd49ca))
* **internal:** codegen related update ([7540210](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7540210313f6d9cc5cd8257a8776275d3c18dcd8))
* **internal:** codegen related update ([00615b4](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/00615b4b5699f008c1cc59dd7cd494c9cd420f8b))
* **internal:** codegen related update ([909837c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/909837c33daead4f55ac46b5d747f0b49711baaf))
* **internal:** codegen related update ([576cdd0](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/576cdd00aee92e26e162cb08dffa80ae173e710c))
* **internal:** codegen related update ([a11aae4](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a11aae44a7e1343c63c496b1718d0b6683707a58))
* **internal:** codegen related update ([1fbd73d](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1fbd73d9f6c777989af1dd41c61c0e953e41c582))
* **internal:** codegen related update ([b28a1eb](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/b28a1eb05e64ac31554983a2a71ac6088a4b3a3c))
* **internal:** codegen related update ([c38e258](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/c38e2584e440bea63a5b07e589f7fb41e45f9ed9))
* **internal:** codegen related update ([d5e7447](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d5e7447bbeae97e72d87455c70e9da495dc21a71))
* **internal:** codegen related update ([57d1eea](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/57d1eeada5dde8f87ab04f57558ea0532634f38e))
* **internal:** codegen related update ([2c66846](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2c66846986650ece003651251c89d72098879bf6))
* **internal:** codegen related update ([cd8203b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cd8203b3f3c368d34ee714b37158b5dd5cd88592))
* **internal:** configure MCP Server hosting ([a3a409b](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/a3a409b3a875992aa8aa5c4cff233d1b7caa08a1))
* **internal:** configure MCP Server hosting ([ac6b84f](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/ac6b84f47dff0422062eb5ec422c0fe6e399bd59))
* **internal:** update lock file ([2a55f50](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2a55f509a516cb1deef7b6366f31178bf2ed6eaf))
* **internal:** update lock file ([01968f6](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/01968f6d515454c6d2783c1cac8ff83eca4abd19))
* **internal:** upgrade babel, qs, js-yaml ([5dcb371](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5dcb371140850722309051e869f690c242e4373a))
* **internal:** upgrade babel, qs, js-yaml ([1757f08](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/1757f087ce5e603c9bbebd16d0c485bb5cf3cb5e))
* **internal:** upgrade brace-expansion and @babel/helpers ([7fb6f6e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7fb6f6eaef80421cf03cfeb89814f1b193aac1f5))
* **internal:** upgrade brace-expansion and @babel/helpers ([afbf5b6](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/afbf5b6d3018b398ced78b3ce7b52eb9e656840d))
* **mcp:** add intent param to execute tool ([f3cecaa](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/f3cecaa8fef942fa42af3b1f13227ac8db22a2be))
* **mcp:** add intent param to execute tool ([03d202e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/03d202eb65644fa4fb5987121f5c307be664ac74))
* **mcp:** pass intent param to execute handler ([bc17aea](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/bc17aea2af60acc69e5eb9f39234da858ff12985))
* **mcp:** pass intent param to execute handler ([99a9770](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/99a977020c7641f1705f0fe5cea1327585fb8c12))
* **mcp:** remove deprecated tool schemes ([4aebd21](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/4aebd21593ec6a57eea8ec13ad68ad6bca13ee26))
* **mcp:** remove deprecated tool schemes ([cc55b24](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/cc55b2488dc24652ddb8ddc756b4b618a58e714a))
* **mcp:** upgrade dependencies ([e3ab970](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e3ab9700c30461220441fbd4a30a818753d364b1))
* **mcp:** upgrade dependencies ([609445e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/609445e75eb1cbb2b380d9702b6a4c4ec6cc8563))
* sync repo ([7ee48c1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/7ee48c1a1c932f2d7fad45f03d3b219d351ff4ba))
* sync repo ([d87090e](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d87090e9cf28b5bbf33ebd9234dfaa0e3a7a8a26))
* update SDK settings ([d4a4358](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/d4a43584f130504c14bb5db71eeb3e50bd77d557))
* update SDK settings ([904050c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/904050c62848baa675339acd0ff443258bf9bb75))
* update SDK settings ([220df2a](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/220df2a709bd20defb5688c3bb04f5ecf1f4a214))
* update SDK settings ([5c56080](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/5c560803cb08557c8bbfc9a144693f2c8374d688))
* update SDK settings ([48722ec](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/48722ec32ebb0616a7e9ec70475cfb2af279631e))
* update SDK settings ([4ff76e5](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/4ff76e53ee2f0e02548246ef0c9a3464e9235c7a))


### Documentation

* add more examples ([e91c433](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/e91c433984a30c51db442046ed43cd59c1a120b1))
* add more examples ([13692c7](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/13692c79f8accc58efffb860f1a691c206f2f94f))
* prominently feature MCP server setup in root SDK readmes ([78086e1](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/78086e1e645bfa8f5724a301ff233518042deb13))
* prominently feature MCP server setup in root SDK readmes ([2684b6c](https://github.com/Mozilla-Ocho/tabstack-typescript/commit/2684b6cbf7b696a268e5028d47704a79066b55ab))
