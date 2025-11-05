# Contributing to TABStack TypeScript SDK

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 16.0.0
- One of: npm, yarn, pnpm, or bun

### Getting Started

1. **Fork and Clone**

```bash
git fork https://github.com/tabstack/tabs-typescript.git
git clone https://github.com/YOUR_USERNAME/tabs-typescript.git
cd tabs-typescript
```

2. **Install Dependencies**

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

3. **Build the Project**

```bash
npm run build
```

4. **Run Tests**

```bash
npm test
```

## Development Workflow

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:clean` - Clean dist folder and rebuild
- `npm run clean` - Remove build artifacts
- `npm test` - Run test suite
- `npm run test:build` - Build and then test
- `npm run watch` - Watch mode for development

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Add tests if applicable in `test/` directory

4. Build and test:
   ```bash
   npm run build
   npm test
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

### Commit Message Format

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test changes
- `refactor:` - Code refactoring
- `chore:` - Build process or auxiliary tool changes

### Testing Your Changes

Before submitting a PR:

1. **Run all tests**: `npm test`
2. **Build successfully**: `npm run build`
3. **Test with different package managers** (if applicable)
4. **Update documentation** if you changed the API

### Project Structure

```
tabs-typescript/
├── src/              # Source TypeScript files
│   ├── index.ts      # Main entry point
│   ├── client.ts     # TABStack client
│   ├── schema.ts     # Schema DSL
│   ├── extract.ts    # Extract operator
│   ├── generate.ts   # Generate operator
│   ├── automate.ts   # Automate operator
│   ├── types.ts      # Response types
│   ├── exceptions.ts # Error classes
│   └── http-client.ts# HTTP client
├── test/             # Test files
├── examples/         # Example usage
├── dist/             # Compiled output (gitignored)
└── README.md         # Documentation
```

## Code Style

- Use TypeScript for all source files
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions focused and small

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md with your changes
3. Ensure all tests pass
4. Request review from maintainers

## Testing

### Running Tests

```bash
npm test
```

### Adding Tests

Add test cases to `test/test-sdk.js`. Each test should:

- Have a descriptive name
- Test a specific functionality
- Include assertions
- Clean up after itself

Example:

```javascript
function testNewFeature() {
  console.log('Testing new feature...');

  const result = yourFunction();
  assert(result === expected, 'Feature should work correctly');

  console.log('✓ New feature works correctly');
}
```

## Releasing

(For maintainers only)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Commit changes:
   ```bash
   git commit -am "chore: release v1.x.x"
   ```
4. Create git tag:
   ```bash
   git tag v1.x.x
   git push origin v1.x.x
   ```
5. Publish to npm:
   ```bash
   npm publish
   ```

## Questions?

- Open an issue: https://github.com/tabstack/tabs-typescript/issues
- Email: support@tabstack.ai

Thank you for contributing! 🎉
