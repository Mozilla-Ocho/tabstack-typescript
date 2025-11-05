/**
 * Generate operator for TABStack AI SDK
 */

import { HTTPClient } from './http-client';
import { Schema } from './schema';
import { JsonResponse } from './types';

export interface GenerateJsonOptions {
  url: string;
  schema: Schema;
  instructions: string;
  nocache?: boolean;
}

/**
 * Generate operator for AI-powered content transformation
 *
 * This class provides methods for generating transformed content from URLs using AI,
 * allowing you to create summaries, restructure data, and enhance content based on
 * custom instructions.
 */
export class Generate {
  constructor(private httpClient: HTTPClient) {}

  /**
   * Generate transformed JSON with AI
   *
   * Fetches URL content, extracts data, and transforms it using AI based on custom
   * instructions. Use this to generate new content, summaries, or restructured data.
   *
   * @param options - Generation options
   * @returns JsonResponse containing the transformed data matching the schema
   *
   * @example
   * ```typescript
   * import { Schema, StringType, ArrayType, ObjectType } from '@tabstack/sdk';
   *
   * const schema = new Schema({
   *   summaries: ArrayType(ObjectType({
   *     title: StringType(),
   *     category: StringType(),
   *     summary: StringType(),
   *   }))
   * });
   *
   * const result = await tabs.generate.json({
   *   url: 'https://news.ycombinator.com',
   *   schema: schema,
   *   instructions: 'Categorize each story and write a one-sentence summary'
   * });
   * console.log(result.data);
   * ```
   */
  async json<T = unknown>(options: GenerateJsonOptions): Promise<JsonResponse<T>> {
    const requestData: Record<string, unknown> = {
      url: options.url,
      json_schema: options.schema.toJSONSchema(),
      instructions: options.instructions,
    };
    if (options.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<T>('v1/generate/json', requestData);
    return JsonResponse.fromJSON(response);
  }
}
