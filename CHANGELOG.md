# Changelog

## 0.1.0 (2026-01-16)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/Mozilla-Ocho/tabstack-typescript/compare/v0.0.1...v0.1.0)

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
