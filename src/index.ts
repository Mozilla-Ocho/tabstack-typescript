/**
 * TABStack AI TypeScript/JavaScript SDK
 *
 * This SDK provides a TypeScript/JavaScript interface to the TABStack AI API for web
 * content extraction, AI-powered content generation, and browser automation.
 *
 * @example
 * ```typescript
 * import { TABStack } from '@tabstack/sdk';
 *
 * const tabs = new TABStack({
 *   apiKey: process.env.TABSTACK_API_KEY!
 * });
 *
 * // Extract markdown
 * const result = await tabs.extract.markdown('https://example.com');
 * console.log(result.content);
 *
 * // Extract structured JSON
 * const schema = {
 *   type: 'object',
 *   properties: {
 *     stories: {
 *       type: 'array',
 *       items: {
 *         type: 'object',
 *         properties: {
 *           title: { type: 'string' },
 *           points: { type: 'number' },
 *           author: { type: 'string' }
 *         }
 *       }
 *     }
 *   }
 * };
 *
 * const data = await tabs.extract.json('https://news.ycombinator.com', schema);
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

// Response types
export {
  Metadata,
  MetadataFields,
  MarkdownResponse,
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
