# Module System Support

The TABStack TypeScript SDK supports all modern JavaScript module systems and TypeScript configurations.

## Supported Module Systems

✅ **CommonJS** - Node.js default (require/module.exports)
✅ **ES Modules (ESM)** - Modern JavaScript (import/export)
✅ **TypeScript** - All module and moduleResolution options
✅ **Dual Package** - Works in both CJS and ESM projects

## Package Exports

The SDK uses the `exports` field in package.json to support all module systems:

```json
{
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "default": "./dist/cjs/index.js"
    }
  }
}
```

## Usage by Module System

### CommonJS (Node.js)

```javascript
// Using require
const { TABStack, Schema, StringType } = require('@tabstack/sdk');

const tabs = new TABStack({ apiKey: 'your-api-key' });
const schema = new Schema({
  name: StringType(),
});
```

**File extension**: `.js`
**Works with**: Node.js (all versions), bundlers

### ES Modules (ESM)

```javascript
// Using import
import { TABStack, Schema, StringType } from '@tabstack/sdk';

const tabs = new TABStack({ apiKey: 'your-api-key' });
const schema = new Schema({
  name: StringType(),
});
```

**File extension**: `.mjs` or `.js` (with `"type": "module"` in package.json)
**Works with**: Node.js 14+, modern browsers (with bundler), Deno, Bun

### TypeScript

```typescript
// Same syntax for all TypeScript configurations
import { TABStack, Schema, StringType } from '@tabstack/sdk';

const tabs = new TABStack({ apiKey: 'your-api-key' });
const schema = new Schema({
  name: StringType(),
});
```

**File extension**: `.ts`
**Works with**: All TypeScript configurations

## TypeScript Configuration Support

The SDK works with all common TypeScript configurations:

### Module Options

| module | moduleResolution | ✅ Supported |
|--------|------------------|--------------|
| `commonjs` | `node` | ✅ Yes |
| `es2015`, `es2020`, `esnext` | `node` | ✅ Yes |
| `node16`, `nodenext` | `node16`, `nodenext` | ✅ Yes |
| `esnext` | `bundler` | ✅ Yes |
| `amd`, `umd`, `system` | `classic` | ✅ Yes |

### Example Configurations

#### CommonJS (Node.js)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

#### ESM (Modern)

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

#### Node16/NodeNext (Hybrid)

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext"
  }
}
```

#### Bundler (Webpack, Vite, etc.)

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

## Runtime Support

### Node.js

**CommonJS** (default):
```javascript
const { TABStack } = require('@tabstack/sdk');
```

**ESM** (with .mjs or package.json type: "module"):
```javascript
import { TABStack } from '@tabstack/sdk';
```

**Minimum version**: Node.js 16.0.0+

### Bun

```javascript
import { TABStack } from '@tabstack/sdk';
```

Bun supports both CommonJS and ESM natively and can even require() ESM packages.

### Deno

```javascript
import { TABStack } from 'npm:@tabstack/sdk';
```

Deno requires the `npm:` specifier to import from npm packages.

## Bundler Support

The SDK works with all popular bundlers:

### Webpack

```javascript
// Works automatically with both import and require
import { TABStack } from '@tabstack/sdk';
```

Webpack's tree-shaking works correctly with the ESM build.

### Vite

```javascript
import { TABStack } from '@tabstack/sdk';
```

Vite automatically uses the ESM build.

### esbuild

```javascript
import { TABStack } from '@tabstack/sdk';
```

esbuild supports both CJS and ESM builds.

### Rollup

```javascript
import { TABStack } from '@tabstack/sdk';
```

Rollup works with the ESM build and supports tree-shaking.

### Parcel

```javascript
import { TABStack } from '@tabstack/sdk';
```

Parcel automatically detects and uses the appropriate build.

## Testing Frameworks

### Jest (CommonJS)

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
};

// test.js
const { TABStack } = require('@tabstack/sdk');

test('creates client', () => {
  const client = new TABStack({ apiKey: 'test' });
  expect(client).toBeDefined();
});
```

### Jest (ESM)

```javascript
// jest.config.js
export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {},
};

// test.mjs
import { TABStack } from '@tabstack/sdk';

test('creates client', () => {
  const client = new TABStack({ apiKey: 'test' });
  expect(client).toBeDefined();
});
```

### Vitest

```javascript
import { describe, it, expect } from 'vitest';
import { TABStack } from '@tabstack/sdk';

describe('TABStack', () => {
  it('creates client', () => {
    const client = new TABStack({ apiKey: 'test' });
    expect(client).toBeDefined();
  });
});
```

### Mocha

```javascript
// CommonJS
const { TABStack } = require('@tabstack/sdk');
const assert = require('assert');

describe('TABStack', () => {
  it('creates client', () => {
    const client = new TABStack({ apiKey: 'test' });
    assert(client);
  });
});
```

## Examples

See the `examples/` directory for complete working examples:

- `examples/javascript-commonjs.js` - Pure JavaScript with CommonJS
- `examples/javascript-esm.mjs` - Pure JavaScript with ESM
- `examples/basic-usage.ts` - TypeScript with all features
- `examples/schema-examples.ts` - TypeScript schema examples

## Troubleshooting

### "Cannot use import statement outside a module"

**Solution**: Use `.mjs` extension or add `"type": "module"` to package.json

### "require() of ES Module not supported"

**Solution**: Use `import` instead of `require()`, or use the CommonJS build directly:
```javascript
const { TABStack } = require('@tabstack/sdk/dist/cjs/index.js');
```

### TypeScript errors with imports

**Solution**: Ensure your tsconfig.json has:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  }
}
```

### "Unexpected token 'export'"

**Solution**: You're trying to run ESM code in a CommonJS environment. Either:
1. Use `.mjs` extension
2. Add `"type": "module"` to package.json
3. Transpile with TypeScript or Babel

## Testing Module Systems

Run the test suite for different module systems:

```bash
# CommonJS tests
npm test

# ESM tests
node test/test-esm.mjs

# JavaScript CommonJS
node test/test-javascript-cjs.js

# JavaScript ESM
node test/test-javascript-esm.mjs
```

## Summary

The TABStack SDK is a **dual package** that works seamlessly with:

- ✅ All JavaScript runtimes (Node.js, Bun, Deno)
- ✅ All module systems (CommonJS, ESM)
- ✅ All TypeScript configurations
- ✅ All popular bundlers
- ✅ All testing frameworks
- ✅ Pure JavaScript and TypeScript projects

No configuration needed - it just works! 🎉
