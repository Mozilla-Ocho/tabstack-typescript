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

- Node.js >= 16.0.0
- TABStack API key ([get one here](https://tabstack.ai))

## License

Apache

## Support

- Documentation: [https://docs.tabstack.ai](https://docs.tabstack.ai)
- GitHub Issues: [https://github.com/tabstack/tabs-typescript/issues](https://github.com/tabstack/tabs-typescript/issues)
- Website: [https://tabstack.ai](https://tabstack.ai)
