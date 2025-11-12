# Contributing to TABStack TypeScript SDK

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tabs-typescript.git
   cd tabs-typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Pull Request Process

### Required Checks

All pull requests must pass the following checks before they can be merged:

✅ **Lint** (`lint.yml` workflow)
- Code must pass ESLint checks
- Code must be formatted according to Prettier rules
- Run locally: `npm run lint` and `npm run format:check`

✅ **Node 20, 22, 24** (`test.yml` workflow)
- All existing tests must pass
- New features must include tests
- Tests must pass on Node.js 20, 22, and 24
- Project must build successfully (CJS, ESM, TypeScript)
- Type tests must pass
- Run locally: `npm test` and `npm run build`

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Run all checks locally**
   ```bash
   npm run lint        # Check for linting errors
   npm run format:check # Check formatting
   npm test            # Run all tests
   npm run test:coverage # Check test coverage
   npm run build       # Verify builds work
   npm run test:types  # Verify type definitions
   ```

4. **Fix any issues**
   ```bash
   npm run lint:fix    # Auto-fix linting issues
   npm run format      # Auto-format code
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a pull request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Explain why the change is needed
   - List any breaking changes

### Pull Request Requirements

- ✅ All status checks must pass (Lint, Node 20, 22, 24)
- ✅ Code review approval from maintainers
- ✅ No merge conflicts with main branch
- ✅ Branch is up to date with main
- ✅ Commits are clean and descriptive

## Code Style

### TypeScript Guidelines

- Use TypeScript for all new code
- Provide proper type annotations
- Avoid `any` types when possible
- Use interfaces for public APIs
- Document complex types

### Testing Guidelines

- Write tests for all new features
- Maintain or improve code coverage (target: 70%+)
- Test both success and error scenarios
- Mock external HTTP requests using `nock`
- Use descriptive test names

Example test structure:
```typescript
describe('Feature', () => {
  describe('method', () => {
    it('should handle success case', async () => {
      // Arrange
      const mockData = { result: 'success' };
      nock('https://api.tabstack.ai')
        .post('/endpoint')
        .reply(200, mockData);

      // Act
      const result = await client.feature.method();

      // Assert
      expect(result).toEqual(mockData);
    });

    it('should handle error case', async () => {
      // Arrange
      nock('https://api.tabstack.ai')
        .post('/endpoint')
        .reply(400, { error: 'Bad request' });

      // Act & Assert
      await expect(client.feature.method()).rejects.toThrow(BadRequestError);
    });
  });
});
```

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Include code examples in documentation
- Update CHANGELOG.md with notable changes

## Continuous Integration

The following workflows run automatically on all pull requests:

1. **Lint Workflow** (`lint.yml`)
   - ESLint validation
   - Prettier formatting check

2. **Test Workflow** (`test.yml`)
   - Tests on Node.js 20, 22, 24 (matrix)
   - Build verification (CJS, ESM, TypeScript)
   - Type definition tests
   - Coverage reporting (Node 20)

All status checks must pass before a PR can be merged.

## Publishing Process

The publish workflow is triggered when a new release is created:

1. **Lint** - Code must pass linting
2. **Test** - All tests must pass on all Node versions
3. **Build** - Package must build successfully
4. **Publish** - Package is published to npm with provenance

## Reporting Issues

- Use GitHub Issues to report bugs
- Provide a clear title and description
- Include steps to reproduce
- Specify Node.js version and OS
- Include relevant error messages

## Getting Help

- Check existing issues and discussions
- Read the [documentation](https://docs.tabstack.ai)
- Ask questions in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

Thank you for contributing! 🎉
