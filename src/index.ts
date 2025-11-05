/**
 * TABStack AI TypeScript/JavaScript SDK
 *
 * This SDK provides a TypeScript/JavaScript interface to the TABStack AI API for web
 * content extraction, AI-powered content generation, and browser automation.
 *
 * @example
 * ```typescript
 * import { TABStack, Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';
 *
 * const tabs = new TABStack({
 *   apiKey: process.env.TABSTACK_API_KEY!
 * });
 *
 * // Extract markdown
 * const result = await tabs.extract.markdown({
 *   url: 'https://example.com'
 * });
 * console.log(result.content);
 *
 * // Extract structured JSON
 * const schema = new Schema({
 *   stories: ArrayType(ObjectType({
 *     title: StringType(),
 *     points: NumberType(),
 *     author: StringType(),
 *   }))
 * });
 *
 * const data = await tabs.extract.json({
 *   url: 'https://news.ycombinator.com',
 *   schema: schema
 * });
 * console.log(data.data);
 * ```
 *
 * @packageDocumentation
 */

// Main client
export { TABStack, TABStackOptions } from './client';

// Operators
export { Extract } from './extract';
export { Generate } from './generate';
export { Automate } from './automate';

// Schema DSL
export {
  Schema,
  StringType,
  NumberType,
  BooleanType,
  ObjectType,
  ArrayType,
  SchemaTypeInterface,
  JSONSchema,
} from './schema';

// Response types
export {
  Metadata,
  MetadataFields,
  MarkdownResponse,
  SchemaResponse,
  JsonResponse,
  AutomateEvent,
  EventData,
} from './types';

// Exceptions
export {
  TABStackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from './exceptions';

// Re-export option types for convenience
export type { ExtractMarkdownOptions, ExtractSchemaOptions, ExtractJsonOptions } from './extract';
export type { GenerateJsonOptions } from './generate';
export type { AutomateExecuteOptions } from './automate';
