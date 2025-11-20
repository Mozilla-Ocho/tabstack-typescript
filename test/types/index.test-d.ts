/**
 * TypeScript type tests using tsd
 *
 * These tests verify that the SDK's TypeScript types are correct and
 * provide proper type safety at compile time.
 */

import { expectType, expectError, expectAssignable, expectNotAssignable } from 'tsd';
import {
  Tabstack,
  TabstackOptions,
  MarkdownResponse,
  JsonResponse,
  Metadata,
  MetadataFields,
  AutomateEvent,
  EventData,
  Extract,
  Generate,
  Automate,
  ExtractMarkdownOptions,
  ExtractSchemaOptions,
  ExtractJsonOptions,
  GenerateJsonOptions,
  AutomateExecuteOptions,
  TabstackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from '../../src';

// ===== Tabstack Client =====

// Valid client creation
const client = new Tabstack({ apiKey: 'test-key' });
expectType<Tabstack>(client);

// Client with baseURL
const clientWithURL = new Tabstack({ apiKey: 'test-key', baseURL: 'https://api.example.com' });
expectType<Tabstack>(clientWithURL);

// Client requires apiKey
expectError(new Tabstack({}));
expectError(new Tabstack({ baseURL: 'https://api.example.com' }));

// Operators exist and have correct types
expectType<Extract>(client.extract);
expectType<Generate>(client.generate);
expectType<Automate>(client.automate);

// ===== Extract Operator =====

// markdown() return type
const markdownResult = client.extract.markdown('https://example.com');
expectType<Promise<MarkdownResponse>>(markdownResult);

// markdown() with options
const markdownWithOptions = client.extract.markdown('https://example.com', {
  metadata: true,
  nocache: true,
});
expectType<Promise<MarkdownResponse>>(markdownWithOptions);

// schema() return type
const schemaResult = client.extract.schema('https://example.com');
expectType<Promise<Record<string, unknown>>>(schemaResult);

// schema() with options
const schemaWithOptions = client.extract.schema('https://example.com', {
  instructions: 'extract stories',
  nocache: true,
});
expectType<Promise<Record<string, unknown>>>(schemaWithOptions);

// json() return type
const jsonResult = client.extract.json('https://example.com', {});
expectType<Promise<JsonResponse<unknown>>>(jsonResult);

// json() with generic type
interface Product {
  name: string;
  price: number;
}
const typedJsonResult = client.extract.json<Product>('https://example.com', {});
expectType<Promise<JsonResponse<Product>>>(typedJsonResult);

// json() with options
const jsonWithOptions = client.extract.json('https://example.com', {}, { nocache: true });
expectType<Promise<JsonResponse<unknown>>>(jsonWithOptions);

// ===== Generate Operator =====

// json() return type
const generateResult = client.generate.json('https://example.com', {}, 'instructions');
expectType<Promise<JsonResponse<unknown>>>(generateResult);

// json() with generic type
interface Analysis {
  sentiment: string;
  score: number;
}
const typedGenerateResult = client.generate.json<Analysis>(
  'https://example.com',
  {},
  'instructions'
);
expectType<Promise<JsonResponse<Analysis>>>(typedGenerateResult);

// json() with options
const generateWithOptions = client.generate.json(
  'https://example.com',
  {},
  'instructions',
  { nocache: true }
);
expectType<Promise<JsonResponse<unknown>>>(generateWithOptions);

// json() requires instructions parameter
expectError(client.generate.json('https://example.com', {}));

// ===== Automate Operator =====

// execute() return type
const automateResult = client.automate.execute('task');
expectType<AsyncGenerator<AutomateEvent, void, undefined>>(automateResult);

// execute() with options
const automateWithOptions = client.automate.execute('task', {
  url: 'https://example.com',
  data: { key: 'value' },
  guardrails: 'safe mode',
  maxIterations: 50,
  maxValidationAttempts: 3,
});
expectType<AsyncGenerator<AutomateEvent, void, undefined>>(automateWithOptions);

// ===== Type Classes =====

// Metadata
const metadata = new Metadata({ title: 'Test', description: 'Desc' });
expectType<Metadata>(metadata);
expectType<string | undefined>(metadata.title);
expectType<string | undefined>(metadata.description);

const metadataFromJSON = Metadata.fromJSON({ title: 'Test', site_name: 'Site' });
expectType<Metadata>(metadataFromJSON);

const metadataJSON = metadata.toJSON();
expectType<MetadataFields>(metadataJSON);

// MarkdownResponse
const markdownResponse = new MarkdownResponse('https://example.com', 'content');
expectType<string>(markdownResponse.url);
expectType<string>(markdownResponse.content);
expectType<Metadata | undefined>(markdownResponse.metadata);

const markdownFromJSON = MarkdownResponse.fromJSON({
  url: 'https://example.com',
  content: 'content',
});
expectType<MarkdownResponse>(markdownFromJSON);

// JsonResponse
const jsonResponse = new JsonResponse({ data: 'value' });
expectType<JsonResponse<{ data: string }>>(jsonResponse);

const jsonFromJSON = JsonResponse.fromJSON<Product>({ name: 'Test', price: 100 });
expectType<JsonResponse<Product>>(jsonFromJSON);
expectType<Product>(jsonFromJSON.data);

// EventData
const eventData = new EventData({ key: 'value', count: 42 });
expectType<EventData>(eventData);

const eventValue = eventData.get('key');
expectType<unknown>(eventValue);

const typedValue = eventData.get<string>('key');
expectType<string | undefined>(typedValue);

const valueWithDefault = eventData.get('missing', 'default');
expectType<string | undefined>(valueWithDefault);

const rawData = eventData.getRaw();
expectType<Record<string, unknown>>(rawData);

// AutomateEvent
const automateEvent = new AutomateEvent('start', eventData);
expectType<string>(automateEvent.type);
expectType<EventData>(automateEvent.data);

const automateFromJSON = AutomateEvent.fromJSON('start', { message: 'Started' });
expectType<AutomateEvent>(automateFromJSON);

const eventString = automateEvent.toString();
expectType<string>(eventString);

// ===== Exception Classes =====

// TabstackError
const tabstackError = new TabstackError('error');
expectType<TabstackError>(tabstackError);
expectType<string>(tabstackError.message);
expectType<number | undefined>(tabstackError.statusCode);
expectAssignable<Error>(tabstackError);

const tabstackErrorWithCode = new TabstackError('error', 500);
expectType<TabstackError>(tabstackErrorWithCode);

// BadRequestError
const badRequestError = new BadRequestError('bad request');
expectType<BadRequestError>(badRequestError);
expectType<number | undefined>(badRequestError.statusCode);
expectAssignable<TabstackError>(badRequestError);
expectAssignable<Error>(badRequestError);

// UnauthorizedError
const unauthorizedError = new UnauthorizedError();
expectType<UnauthorizedError>(unauthorizedError);
expectAssignable<TabstackError>(unauthorizedError);

const unauthorizedWithMessage = new UnauthorizedError('custom message');
expectType<UnauthorizedError>(unauthorizedWithMessage);

// InvalidURLError
const invalidURLError = new InvalidURLError();
expectType<InvalidURLError>(invalidURLError);
expectAssignable<TabstackError>(invalidURLError);

// ServerError
const serverError = new ServerError();
expectType<ServerError>(serverError);
expectAssignable<TabstackError>(serverError);

// ServiceUnavailableError
const serviceError = new ServiceUnavailableError();
expectType<ServiceUnavailableError>(serviceError);
expectAssignable<TabstackError>(serviceError);

// APIError
const apiError = new APIError('error', 418);
expectType<APIError>(apiError);
expectType<number | undefined>(apiError.statusCode);
expectAssignable<TabstackError>(apiError);

// APIError requires both message and status code
expectError(new APIError('error'));

// ===== Options Interfaces =====

// TabstackOptions
const validOptions: TabstackOptions = { apiKey: 'test' };
expectType<TabstackOptions>(validOptions);

const optionsWithURL: TabstackOptions = { apiKey: 'test', baseURL: 'https://api.example.com' };
expectType<TabstackOptions>(optionsWithURL);

// ExtractMarkdownOptions
const markdownOptions: ExtractMarkdownOptions = { metadata: true, nocache: true };
expectType<ExtractMarkdownOptions>(markdownOptions);

// ExtractSchemaOptions
const schemaOptions: ExtractSchemaOptions = { instructions: 'extract', nocache: true };
expectType<ExtractSchemaOptions>(schemaOptions);

// ExtractJsonOptions
const extractJsonOptions: ExtractJsonOptions = { nocache: true };
expectType<ExtractJsonOptions>(extractJsonOptions);

// GenerateJsonOptions
const generateOptions: GenerateJsonOptions = { nocache: true };
expectType<GenerateJsonOptions>(generateOptions);

// AutomateExecuteOptions
const automateOptions: AutomateExecuteOptions = {
  url: 'https://example.com',
  data: { key: 'value' },
  guardrails: 'safe',
  maxIterations: 50,
  maxValidationAttempts: 3,
};
expectType<AutomateExecuteOptions>(automateOptions);

// ===== Type Safety Tests =====

// Cannot assign wrong types
expectNotAssignable<TabstackOptions>({ baseURL: 'https://api.example.com' }); // missing apiKey
expectNotAssignable<ExtractMarkdownOptions>({ invalid: true });
expectNotAssignable<AutomateExecuteOptions>({ maxIterations: 'not a number' });

// Generic type inference
async function testGenericInference() {
  const result = await client.extract.json<{ id: number; name: string }>(
    'https://example.com',
    {}
  );

  // Should infer the correct type
  expectType<{ id: number; name: string }>(result.data);

  // Should not allow incorrect property access
  expectError(result.data.nonexistent);
}

// Async iteration type inference
async function testAsyncIteration() {
  for await (const event of client.automate.execute('task')) {
    expectType<AutomateEvent>(event);
    expectType<string>(event.type);
    expectType<EventData>(event.data);
  }
}

// Promise chain types
async function testPromiseChains() {
  const markdown = await client.extract.markdown('https://example.com');
  expectType<string>(markdown.url);
  expectType<string>(markdown.content);

  const json = await client.extract.json<Product>('https://example.com', {});
  expectType<Product>(json.data);
}

// Error type guards
function handleError(error: unknown) {
  if (error instanceof TabstackError) {
    expectType<TabstackError>(error);
    expectType<string>(error.message);
    expectType<number | undefined>(error.statusCode);
  }

  if (error instanceof BadRequestError) {
    expectType<BadRequestError>(error);
    expectAssignable<TabstackError>(error);
  }

  if (error instanceof UnauthorizedError) {
    expectType<UnauthorizedError>(error);
  }
}
