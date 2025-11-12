# TABStack AI TypeScript SDK

TypeScript/JavaScript SDK for [TABStack AI](https://tabstack.ai) - Extract, Generate, and Automate web content with AI.

## Features

- **Extract**: Convert web pages to Markdown, generate schemas, and extract structured JSON data
- **Generate**: Transform web content using AI with custom instructions
- **Automate**: Execute complex browser automation tasks with natural language
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Uses only Node.js standard library
- **Universal Module Support**: Works with CommonJS, ESM, and all TypeScript configurations

## Installation

Install the SDK using your preferred package manager:

### npm
```bash
npm install @tabstack/sdk
```

### Yarn
```bash
yarn add @tabstack/sdk
```

### pnpm
```bash
pnpm add @tabstack/sdk
```

### Bun
```bash
bun add @tabstack/sdk
```

### From Source

Clone and build the SDK locally:

```bash
git clone https://github.com/tabstack/tabs-typescript.git
cd tabs-typescript
npm install
npm run build
```

To use the local build in your project:

```bash
# Link the package globally
npm link

# In your project directory
npm link @tabstack/sdk
```

Or install directly from the local path:

```bash
npm install /path/to/tabs-typescript
```

## Quick Start

### Get Your API Key

Sign up at [tabstack.ai](https://tabstack.ai) to get your API key.

### Basic Usage

#### ES Modules (ESM)
```typescript
import { TABStack } from '@tabstack/sdk';

const tabs = new TABStack({
  apiKey: process.env.TABSTACK_API_KEY!
});

// Extract markdown from a URL
const markdown = await tabs.extract.markdown('https://example.com');
console.log(markdown.content);

// Extract structured data with JSON schema
const schema = {
  type: 'object',
  properties: {
    stories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          points: { type: 'number' },
          author: { type: 'string' }
        },
        required: ['title', 'points', 'author']
      }
    }
  },
  required: ['stories']
};

const data = await tabs.extract.json('https://news.ycombinator.com', schema);
console.log(data.data);
```

#### CommonJS
```javascript
const { TABStack } = require('@tabstack/sdk');

const tabs = new TABStack({
  apiKey: process.env.TABSTACK_API_KEY
});

// Extract markdown
tabs.extract.markdown('https://example.com')
  .then(result => {
    console.log(result.content);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

## Core Features

### Extract Markdown

Convert web pages to clean Markdown format:

```typescript
const result = await tabs.extract.markdown('https://example.com/blog/article', {
  metadata: true,  // optional: include page metadata
  nocache: false   // optional: bypass cache
});

console.log(result.content);
console.log(result.metadata); // if metadata: true
```

### Extract Structured Data

Extract data matching a JSON schema:

```typescript
const schema = {
  type: 'object',
  properties: {
    products: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          inStock: { type: 'boolean' }
        },
        required: ['name', 'price', 'inStock']
      }
    }
  },
  required: ['products']
};

const result = await tabs.extract.json('https://example.com/products', schema);
console.log(result.data);
```

### Generate Schema

Generate a JSON schema from web content:

```typescript
const schema = await tabs.extract.schema('https://news.ycombinator.com', {
  instructions: 'extract top stories with title, points, and author'
});

// Use the generated schema for extraction
const result = await tabs.extract.json('https://news.ycombinator.com', schema);
console.log(result.data);
```

### Generate Content

Transform web content using AI:

```typescript
const schema = {
  type: 'object',
  properties: {
    summaries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          category: { type: 'string' },
          summary: { type: 'string' }
        },
        required: ['title', 'category', 'summary']
      }
    }
  },
  required: ['summaries']
};

const result = await tabs.generate.json(
  'https://news.ycombinator.com',
  schema,
  'Categorize each story and write a one-sentence summary'
);

console.log(result.data);
```

### Automate Tasks

Execute browser automation tasks with streaming updates:

```typescript
for await (const event of tabs.automate.execute(
  'Find the top 3 trending repositories and extract their details',
  {
    url: 'https://github.com/trending',
    guardrails: 'browse and extract only',
    maxIterations: 50
  }
)) {
  console.log(`Event: ${event.type}`);

  if (event.type === 'task:completed') {
    console.log('Result:', event.data.get('finalAnswer'));
  } else if (event.type === 'agent:extracted') {
    console.log('Extracted:', event.data.get('extractedData'));
  }
}
```

## Working with JSON Schemas

The SDK uses standard [JSON Schema](https://json-schema.org/) format for defining data structures. You can define schemas manually or generate them automatically:

### Manual Schema Definition

```typescript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'Person name' },
    age: { type: 'number', description: 'Person age' },
    isActive: { type: 'boolean', description: 'Active status' },
    tags: {
      type: 'array',
      items: { type: 'string' }
    },
    addresses: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          street: { type: 'string' },
          city: { type: 'string' },
          zipCode: { type: 'number' }
        },
        required: ['street', 'city', 'zipCode']
      }
    },
    metadata: {
      type: 'object',
      properties: {
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
      },
      required: ['createdAt', 'updatedAt']
    }
  },
  required: ['name', 'age']
};
```

### Automatic Schema Generation

Let the AI generate a schema from any webpage:

```typescript
// Generate schema from content
const schema = await tabs.extract.schema('https://news.ycombinator.com', {
  instructions: 'extract stories with title, points, and author'
});

// Use it immediately
const data = await tabs.extract.json('https://news.ycombinator.com', schema);
```

## Error Handling

Handle errors with specific error classes:

```typescript
import {
  TABStackError,
  UnauthorizedError,
  InvalidURLError,
  BadRequestError,
  ServerError
} from '@tabstack/sdk';

try {
  const result = await tabs.extract.markdown('https://example.com');
} catch (error) {
  if (error instanceof UnauthorizedError) {
    console.error('Invalid API key');
  } else if (error instanceof InvalidURLError) {
    console.error('Invalid or inaccessible URL');
  } else if (error instanceof TABStackError) {
    console.error(`API error: ${error.message}`);
  }
}
```

### Error Classes

- `TABStackError` - Base error class
- `BadRequestError` - 400: Malformed request
- `UnauthorizedError` - 401: Invalid API key
- `InvalidURLError` - 422: Invalid or inaccessible URL
- `ServerError` - 500: Internal server error
- `ServiceUnavailableError` - 503: Service unavailable
- `APIError` - Generic API error with status code

## Requirements

- Node.js >= 20.0.0
- TABStack API key ([get one here](https://tabstack.ai))

## Development & Testing

This SDK includes a comprehensive testing suite with excellent code coverage and type safety.

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run TypeScript type tests
npm run test:types
```

### Test Structure

The SDK includes multiple types of tests:

**Unit Tests** (`src/**/*.test.ts`)
- HTTPClient tests - HTTP request/response handling, error scenarios
- Exception classes tests - Error creation and inheritance
- Type classes tests - Serialization, deserialization, data access
- Extract operator tests - Markdown, schema, and JSON extraction
- Generate operator tests - AI-powered content generation
- Automate operator tests - SSE streaming and event parsing
- Client tests - Main client initialization and configuration

**E2E Tests** (`test/e2e/`)
- Complete workflows from client to operators
- Real-world use case scenarios
- Error handling and edge cases
- Multi-operation workflows

**Type Tests** (`test/types/`)
- TypeScript type safety validation using `tsd`
- Generic type inference
- Type guard verification
- Compile-time type checking

### Test Coverage

The SDK maintains high test coverage across all modules:

- **172+ test cases** covering all major functionality
- **~70%+ code coverage** across branches, functions, lines, and statements
- **Mocked HTTP requests** using `nock` for fast, reliable tests
- **Type-safe tests** with full TypeScript support

### Test Technologies

- **Jest** - Test runner and assertion library
- **ts-jest** - TypeScript support for Jest
- **nock** - HTTP request mocking
- **tsd** - TypeScript type definition testing

### Writing Tests

When contributing to the SDK, please:

1. Write tests for all new features and bug fixes
2. Maintain or improve code coverage
3. Use descriptive test names that explain the behavior being tested
4. Mock external HTTP requests using `nock`
5. Test both success and error scenarios
6. Add type tests for new public APIs

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
      nock('https://api.tabstack.ai')
        .post('/endpoint')
        .reply(400, { error: 'Bad request' });

      await expect(client.feature.method()).rejects.toThrow(BadRequestError);
    });
  });
});
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/tabs-typescript.git
cd tabs-typescript

# Install dependencies
npm install

# Run checks locally before submitting PR
npm run lint        # Check for linting errors
npm run format:check # Check formatting
npm test            # Run all tests
npm run build       # Verify builds work
```

### Pull Request Requirements

All PRs must pass these checks before merging:

- ✅ **Lint** - Code style and formatting (ESLint + Prettier)
- ✅ **Node 20, 22, 24** - Tests and builds on all supported Node versions
- ✅ **Code Review** - Approval from maintainers

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

Apache

## Support

- Documentation: [https://docs.tabstack.ai](https://docs.tabstack.ai)
- GitHub Issues: [https://github.com/tabstack/tabs-typescript/issues](https://github.com/tabstack/tabs-typescript/issues)
- Website: [https://tabstack.ai](https://tabstack.ai)
