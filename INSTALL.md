# Installation Guide

This guide covers all the different ways to install and use the TABStack AI TypeScript SDK.

## Table of Contents

- [npm](#npm)
- [yarn](#yarn)
- [pnpm](#pnpm)
- [bun](#bun)
- [Installation from Source](#installation-from-source)
- [Verifying Installation](#verifying-installation)

## npm

The most common package manager for Node.js projects.

### Install

```bash
npm install @tabstack/sdk
```

### Install as Dev Dependency

```bash
npm install --save-dev @tabstack/sdk
```

### Install Specific Version

```bash
npm install @tabstack/sdk@1.0.0
```

### Global Install (not recommended)

```bash
npm install -g @tabstack/sdk
```

## yarn

A fast, reliable, and secure alternative to npm.

### Install (Yarn 1.x)

```bash
yarn add @tabstack/sdk
```

### Install as Dev Dependency

```bash
yarn add --dev @tabstack/sdk
```

### Install Specific Version

```bash
yarn add @tabstack/sdk@1.0.0
```

### Install (Yarn 2+/Berry)

```bash
yarn add @tabstack/sdk
```

## pnpm

Fast, disk space efficient package manager.

### Install

```bash
pnpm add @tabstack/sdk
```

### Install as Dev Dependency

```bash
pnpm add -D @tabstack/sdk
```

### Install Specific Version

```bash
pnpm add @tabstack/sdk@1.0.0
```

## bun

An all-in-one JavaScript runtime & toolkit.

### Install

```bash
bun add @tabstack/sdk
```

### Install as Dev Dependency

```bash
bun add --dev @tabstack/sdk
```

### Install Specific Version

```bash
bun add @tabstack/sdk@1.0.0
```

## Installation from Source

If you want to build from source or contribute to the project:

### 1. Clone the Repository

```bash
git clone https://github.com/tabstack/tabs-typescript.git
cd tabs-typescript
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 3. Build the Project

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build

# bun
bun run build
```

### 4. Run Tests

```bash
# npm
npm test

# yarn
yarn test

# pnpm
pnpm test

# bun
bun test
```

### 5. Link for Local Development

To use your local build in other projects:

```bash
# npm
npm link

# Then in your other project:
npm link @tabstack/sdk

# yarn
yarn link

# Then in your other project:
yarn link @tabstack/sdk

# pnpm
pnpm link --global

# Then in your other project:
pnpm link --global @tabstack/sdk

# bun
bun link

# Then in your other project:
bun link @tabstack/sdk
```

### 6. Install from Local Directory

You can also install directly from a local directory:

```bash
# npm
npm install /path/to/tabs-typescript

# yarn
yarn add file:/path/to/tabs-typescript

# pnpm
pnpm add file:/path/to/tabs-typescript

# bun
bun add /path/to/tabs-typescript
```

## Verifying Installation

After installation, verify the SDK is working:

### Create a Test File

Create `test-install.js`:

```javascript
const { TABStack, Schema, StringType } = require('@tabstack/sdk');

console.log('TABStack SDK installed successfully!');
console.log('TABStack:', typeof TABStack);
console.log('Schema:', typeof Schema);
console.log('StringType:', typeof StringType);

// Test schema creation
const schema = new Schema({
  test: StringType('Test field')
});

console.log('Schema created:', schema.toJSONSchema());
```

### Run the Test

```bash
# npm/yarn/pnpm
node test-install.js

# bun
bun run test-install.js
```

Expected output:
```
TABStack SDK installed successfully!
TABStack: function
Schema: function
StringType: function
Schema created: { type: 'object', properties: { test: { type: 'string', description: 'Test field' } }, required: [ 'test' ], additionalProperties: false }
```

## TypeScript Setup

If you're using TypeScript in your project:

### 1. Ensure TypeScript is Installed

```bash
# npm
npm install --save-dev typescript

# yarn
yarn add --dev typescript

# pnpm
pnpm add -D typescript

# bun
bun add --dev typescript
```

### 2. Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### 3. Create a TypeScript Test File

Create `test-install.ts`:

```typescript
import { TABStack, Schema, StringType, NumberType } from '@tabstack/sdk';

const tabs = new TABStack({
  apiKey: 'test-key'
});

const schema = new Schema({
  name: StringType(),
  age: NumberType()
});

console.log('TypeScript setup working!');
console.log(schema.toJSONSchema());
```

### 4. Compile and Run

```bash
# npm
npx tsc test-install.ts
node test-install.js

# yarn
yarn tsc test-install.ts
node test-install.js

# pnpm
pnpm tsc test-install.ts
node test-install.js

# bun (can run TypeScript directly)
bun run test-install.ts
```

## Troubleshooting

### Module Not Found

If you get "Cannot find module '@tabstack/sdk'":

1. Verify installation: `npm list @tabstack/sdk` (or equivalent for your package manager)
2. Clear cache and reinstall:
   ```bash
   # npm
   rm -rf node_modules package-lock.json
   npm install

   # yarn
   rm -rf node_modules yarn.lock
   yarn install

   # pnpm
   rm -rf node_modules pnpm-lock.yaml
   pnpm install

   # bun
   rm -rf node_modules bun.lockb
   bun install
   ```

### TypeScript Type Errors

If you're getting TypeScript errors:

1. Ensure `skipLibCheck: true` is in your `tsconfig.json`
2. Update `@types/node`: `npm install --save-dev @types/node@latest`
3. Clear TypeScript cache: `rm -rf node_modules/.cache`

### Build from Source Fails

If building from source fails:

1. Ensure Node.js >= 16.0.0: `node --version`
2. Clear build artifacts: `npm run clean`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Rebuild: `npm run build`

## Getting Help

- Documentation: https://docs.tabstack.ai
- GitHub Issues: https://github.com/tabstack/tabs-typescript/issues
- Website: https://tabstack.ai
