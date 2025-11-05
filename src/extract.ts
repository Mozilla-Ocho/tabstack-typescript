/**
 * Extract operator for TABStack AI SDK
 */

import { HTTPClient } from './http-client';
import { Schema } from './schema';
import { MarkdownResponse, SchemaResponse, JsonResponse } from './types';

export interface ExtractMarkdownOptions {
  url: string;
  metadata?: boolean;
  nocache?: boolean;
}

export interface ExtractSchemaOptions {
  url: string;
  instructions?: string;
  nocache?: boolean;
}

export interface ExtractJsonOptions {
  url: string;
  schema: Schema;
  nocache?: boolean;
}

/**
 * Extract operator for converting and extracting web content
 *
 * This class provides methods for extracting content from URLs in various formats:
 * - Markdown conversion
 * - Schema generation
 * - Structured JSON extraction
 */
export class Extract {
  constructor(private httpClient: HTTPClient) {}

  /**
   * Convert URL content to Markdown format
   *
   * Fetches a URL and converts its HTML content to clean Markdown format with
   * optional metadata extraction.
   *
   * @param options - Extraction options
   * @returns MarkdownResponse containing the converted content and optional metadata
   *
   * @example
   * ```typescript
   * const result = await tabs.extract.markdown({
   *   url: 'https://example.com/blog/article',
   *   metadata: true
   * });
   * console.log(result.content);
   * console.log(result.metadata?.title);
   * ```
   */
  async markdown(options: ExtractMarkdownOptions): Promise<MarkdownResponse> {
    const requestData: Record<string, unknown> = { url: options.url };
    if (options.metadata) requestData.metadata = options.metadata;
    if (options.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<Record<string, unknown>>(
      'v1/extract/markdown',
      requestData
    );
    return MarkdownResponse.fromJSON(response);
  }

  /**
   * Generate schema from URL content
   *
   * Analyzes URL content and generates a schema that describes the structure
   * of the data. Use this to create schemas for the json() method.
   *
   * @param options - Schema generation options
   * @returns SchemaResponse containing the generated Schema object
   *
   * @example
   * ```typescript
   * const result = await tabs.extract.schema({
   *   url: 'https://news.ycombinator.com',
   *   instructions: 'extract top stories with title, points, and author'
   * });
   * // result.schema is a Schema object
   * const data = await tabs.extract.json({
   *   url: 'https://news.ycombinator.com',
   *   schema: result.schema
   * });
   * ```
   */
  async schema(options: ExtractSchemaOptions): Promise<SchemaResponse> {
    const requestData: Record<string, unknown> = { url: options.url };
    if (options.instructions) requestData.instructions = options.instructions;
    if (options.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<unknown>('v1/extract/json/schema', requestData);
    return SchemaResponse.fromJSON(response as import('./schema').JSONSchema);
  }

  /**
   * Extract structured JSON from URL content
   *
   * Fetches a URL and extracts structured data according to the provided schema.
   *
   * @param options - JSON extraction options
   * @returns JsonResponse containing the extracted data matching the schema
   *
   * @example
   * ```typescript
   * import { Schema, StringType, NumberType, ArrayType, ObjectType } from '@tabstack/sdk';
   *
   * const schema = new Schema({
   *   stories: ArrayType(ObjectType({
   *     title: StringType(),
   *     points: NumberType(),
   *     author: StringType(),
   *   }))
   * });
   *
   * const result = await tabs.extract.json({
   *   url: 'https://news.ycombinator.com',
   *   schema: schema
   * });
   * console.log(result.data);
   * ```
   */
  async json<T = unknown>(options: ExtractJsonOptions): Promise<JsonResponse<T>> {
    const requestData: Record<string, unknown> = {
      url: options.url,
      json_schema: options.schema.toJSONSchema(),
    };
    if (options.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<T>('v1/extract/json', requestData);
    return JsonResponse.fromJSON(response);
  }
}
