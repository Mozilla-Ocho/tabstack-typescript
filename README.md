# TABStack AI TypeScript SDK

TypeScript/JavaScript SDK for [TABStack AI](https://tabstack.ai) - Extract, Generate, and Automate web content with AI.

## Features

- **Extract**: Convert web pages to Markdown, generate schemas, and extract structured JSON data
- **Generate**: Transform web content using AI with custom instructions
- **Automate**: Execute complex browser automation tasks with natural language
- **Type-Safe**: Full TypeScript support with comprehensive type definitions
- **Zero Dependencies**: Uses only Node.js standard library (no external dependencies)
- **Universal Module Support**: Works with CommonJS, ESM, and all TypeScript configurations
- **Dual Package**: Supports both `require()` and `import` syntax
- **JavaScript Compatible**: Works seamlessly with pure JavaScript projects (both CJS and ESM)

## Installation

### Using Package Managers

```bash
# npm
npm install @tabstack/sdk

# yarn
yarn add @tabstack/sdk

# pnpm
pnpm add @tabstack/sdk

# bun
bun add @tabstack/sdk
```

### From Source

```bash
git clone https://github.com/tabstack/tabs-typescript.git
cd tabs-typescript
npm install
npm run build
npm link  # For local development
```

For detailed installation instructions including npx usage, global installs, and troubleshooting, see [INSTALL.md](INSTALL.md).

## Module System Support

The SDK works with **all** JavaScript module systems:

**ES Modules (ESM)**:
```javascript
import { TABStack, Schema, StringType } from '@tabstack/sdk';
```

**CommonJS**:
```javascript
const { TABStack, Schema, StringType } = require('@tabstack/sdk');
```

For comprehensive module system documentation, see [MODULE_SYSTEMS.md](MODULE_SYSTEMS.md).

## Quick Start

**TypeScript / ESM:**
```typescript
import { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';

const tabs = new TABStack({
  apiKey: process.env.TABSTACK_API_KEY!
});

// Extract markdown from a URL
const markdown = await tabs.extract.markdown({
  url: 'https://example.com'
});
console.log(markdown.content);

// Extract structured data
const schema = new Schema({
  stories: ArrayType(ObjectType({
    title: StringType(),
    points: NumberType(),
    author: StringType(),
  }))
});

const data = await tabs.extract.json({
  url: 'https://news.ycombinator.com',
  schema: schema
});
console.log(data.data);
```

## API Reference

### Client Initialization

```typescript
import { TABStack } from '@tabstack/sdk';

const tabs = new TABStack({
  apiKey: 'your-api-key',
  baseURL: 'https://api.tabstack.ai/'  // optional
});
```

### Extract Operator

#### Extract Markdown

Convert web pages to clean Markdown format:

```typescript
const result = await tabs.extract.markdown({
  url: 'https://example.com/blog/article',
  metadata: true,  // optional: include page metadata
  nocache: false   // optional: bypass cache
});

console.log(result.content);    // Markdown content
console.log(result.metadata);   // Page metadata (if requested)
```

#### Generate Schema

Generate a schema from web content:

```typescript
const result = await tabs.extract.schema({
  url: 'https://news.ycombinator.com',
  instructions: 'extract top stories with title, points, and author',  // optional
  nocache: false  // optional
});

// Use the generated schema
const schema = result.schema;
```

#### Extract Structured JSON

Extract data matching a schema:

```typescript
import { Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';

const schema = new Schema({
  stories: ArrayType(ObjectType({
    title: StringType(),
    points: NumberType(),
    author: StringType(),
  }))
});

const result = await tabs.extract.json({
  url: 'https://news.ycombinator.com',
  schema: schema,
  nocache: false  // optional
});

console.log(result.data);  // Extracted data matching schema
```

### Generate Operator

Transform web content using AI:

```typescript
import { Schema, StringType, ArrayType, ObjectType } from '@tabstack/sdk';

const schema = new Schema({
  summaries: ArrayType(ObjectType({
    title: StringType(),
    category: StringType(),
    summary: StringType(),
  }))
});

const result = await tabs.generate.json({
  url: 'https://news.ycombinator.com',
  schema: schema,
  instructions: 'Categorize each story and write a one-sentence summary',
  nocache: false  // optional
});

console.log(result.data);
```

### Automate Operator

Execute browser automation tasks with streaming updates:

```typescript
for await (const event of tabs.automate.execute({
  task: 'Find the top 3 trending repositories and extract their details',
  url: 'https://github.com/trending',
  guardrails: 'browse and extract only',  // optional
  maxIterations: 50,                      // optional
  maxValidationAttempts: 3                // optional
})) {
  console.log(`Event: ${event.type}`);

  if (event.type === 'task:completed') {
    console.log('Result:', event.data.get('finalAnswer'));
  } else if (event.type === 'agent:extracted') {
    console.log('Extracted:', event.data.get('extractedData'));
  }
}
```

### Schema DSL

The SDK provides a type-safe DSL for defining JSON schemas:

```typescript
import {
  Schema,
  StringType,
  NumberType,
  BooleanType,
  ArrayType,
  ObjectType
} from '@tabstack/sdk';

const schema = new Schema({
  // Basic types
  name: StringType('Person name'),
  age: NumberType('Person age'),
  isActive: BooleanType('Active status'),

  // Array of strings
  tags: ArrayType(StringType()),

  // Array of objects
  addresses: ArrayType(ObjectType({
    street: StringType(),
    city: StringType(),
    zipCode: NumberType(),
  })),

  // Nested object
  metadata: ObjectType({
    createdAt: StringType(),
    updatedAt: StringType(),
  })
});

// Convert to JSON Schema format
const jsonSchema = schema.toJSONSchema();

// Create Schema from JSON Schema
const reconstructed = Schema.fromJSONSchema(jsonSchema);
```

## Response Types

### MarkdownResponse

```typescript
interface MarkdownResponse {
  url: string;
  content: string;
  metadata?: Metadata;
}
```

### SchemaResponse

```typescript
interface SchemaResponse {
  schema: Schema;
}
```

### JsonResponse

```typescript
interface JsonResponse<T = unknown> {
  data: T;
}
```

### AutomateEvent

```typescript
class AutomateEvent {
  type: string;
  data: EventData;
}

class EventData {
  get<T>(key: string, defaultValue?: T): T | undefined;
  getRaw(): Record<string, unknown>;
}
```

## Error Handling

The SDK provides specific error classes for different scenarios:

```typescript
import {
  TABStackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from '@tabstack/sdk';

try {
  const result = await tabs.extract.markdown({ url: 'https://example.com' });
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

## JavaScript Usage

The SDK works seamlessly with JavaScript:

```javascript
const { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } = require('@tabstack/sdk');

const tabs = new TABStack({
  apiKey: process.env.TABSTACK_API_KEY
});

// Extract markdown
tabs.extract.markdown({ url: 'https://example.com' })
  .then(result => {
    console.log(result.content);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// Extract structured data
const schema = new Schema({
  title: StringType(),
  price: NumberType(),
});

tabs.extract.json({ url: 'https://example.com', schema })
  .then(result => {
    console.log(result.data);
  });
```

## Examples

### Example 1: News Aggregation

```typescript
import { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';

const tabs = new TABStack({ apiKey: process.env.TABSTACK_API_KEY! });

const newsSchema = new Schema({
  articles: ArrayType(ObjectType({
    title: StringType(),
    author: StringType(),
    publishedAt: StringType(),
    summary: StringType(),
  }))
});

const news = await tabs.extract.json({
  url: 'https://news.ycombinator.com',
  schema: newsSchema
});

console.log(`Found ${news.data.articles.length} articles`);
```

### Example 2: Content Transformation

```typescript
const summarySchema = new Schema({
  summary: StringType(),
  keyPoints: ArrayType(StringType()),
  sentiment: StringType(),
});

const result = await tabs.generate.json({
  url: 'https://example.com/long-article',
  schema: summarySchema,
  instructions: 'Create a brief summary, extract key points, and analyze sentiment'
});

console.log('Summary:', result.data.summary);
console.log('Key Points:', result.data.keyPoints);
console.log('Sentiment:', result.data.sentiment);
```

### Example 3: Automated Research

```typescript
for await (const event of tabs.automate.execute({
  task: 'Research the top 5 TypeScript frameworks and create a comparison',
  url: 'https://www.npmjs.com',
  guardrails: 'browse, search, and extract only',
})) {
  if (event.type === 'agent:thinking') {
    console.log('Thinking:', event.data.get('thought'));
  } else if (event.type === 'task:completed') {
    console.log('Research completed!');
    console.log(event.data.get('finalAnswer'));
  }
}
```

## Requirements

- Node.js >= 16.0.0
- TABStack API key ([get one here](https://tabstack.ai))

## License

MIT

## Support

- Documentation: [https://docs.tabstack.ai](https://docs.tabstack.ai)
- GitHub Issues: [https://github.com/tabstack/tabs-typescript/issues](https://github.com/tabstack/tabs-typescript/issues)
- Website: [https://tabstack.ai](https://tabstack.ai)
