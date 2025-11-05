# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-05

### Changed

- **BREAKING**: Schema type constructors are now factory functions instead of classes
  - `new StringType()` → `StringType()`
  - `new NumberType()` → `NumberType()`
  - `new BooleanType()` → `BooleanType()`
  - `new ObjectType({...})` → `ObjectType({...})`
  - `new ArrayType(...)` → `ArrayType(...)`

#### Migration Example

**Before:**
```typescript
const schema = new Schema({
  name: new StringType(),
  age: new NumberType(),
  tags: new ArrayType(new StringType()),
  address: new ObjectType({
    street: new StringType(),
    city: new StringType(),
  })
});
```

**After:**
```typescript
const schema = new Schema({
  name: StringType(),
  age: NumberType(),
  tags: ArrayType(StringType()),
  address: ObjectType({
    street: StringType(),
    city: StringType(),
  })
});
```

### Added

- Full TypeScript support with comprehensive type definitions
- Zero-dependency implementation using only Node.js standard library
- Support for npm, yarn, pnpm, and bun package managers
- Complete test suite with 6 passing tests
- Comprehensive documentation and examples

### Features

- Extract operator for Markdown conversion, schema generation, and JSON extraction
- Generate operator for AI-powered content transformation
- Automate operator for browser automation with streaming events
- Custom exception classes for API errors
- Schema DSL with `fromJSONSchema` deserialization support
