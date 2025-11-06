/**
 * Generate operator for TABStack AI SDK
 */

import { HTTPClient } from './http-client';
import { JsonResponse } from './types';

export interface GenerateJsonOptions {
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
   * instructions. Use this to generate new content, summaries, categorizations, or
   * restructured data. Unlike extract.json() which extracts existing data, this
   * method creates new content based on your instructions.
   *
   * @param url - URL to fetch content from
   * @param schema - JSON schema object defining the structure of the transformed output
   * @param instructions - Instructions describing how to transform the data. Example: "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms."
   * @param options - Optional generation options
   * @param options.nocache - Bypass cache and force fresh data retrieval. Default: false
   *
   * @returns JsonResponse containing the transformed data matching the schema
   *
   * @throws {BadRequestError} When URL, schema, or instructions are missing, or schema format is invalid
   * @throws {UnauthorizedError} When API key is invalid or missing
   * @throws {InvalidURLError} When URL is invalid
   * @throws {ServerError} When server fails to fetch URL, page is too large, or data transformation fails
   *
   * @example
   * Categorize and summarize news stories:
   * ```typescript
   * const schema = {
   *   type: 'object',
   *   properties: {
   *     summaries: {
   *       type: 'array',
   *       items: {
   *         type: 'object',
   *         properties: {
   *           title: { type: 'string' },
   *           category: { type: 'string' },
   *           summary: { type: 'string' }
   *         },
   *         required: ['title', 'category', 'summary']
   *       }
   *     }
   *   },
   *   required: ['summaries']
   * };
   *
   * const result = await tabs.generate.json(
   *   'https://news.ycombinator.com',
   *   schema,
   *   'For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\'s about in simple terms.'
   * );
   *
   * console.log(result.data.summaries);
   * // [
   * //   {
   * //     title: "New AI Model Released",
   * //     category: "tech",
   * //     summary: "A research lab announced a new large language model that achieves state-of-the-art performance on reasoning tasks."
   * //   },
   * //   ...
   * // ]
   * ```
   *
   * @example
   * Create structured analysis:
   * ```typescript
   * const schema = {
   *   type: 'object',
   *   properties: {
   *     sentiment: { type: 'string' },
   *     keyPoints: {
   *       type: 'array',
   *       items: { type: 'string' }
   *     },
   *     summary: { type: 'string' },
   *     tags: {
   *       type: 'array',
   *       items: { type: 'string' }
   *     }
   *   },
   *   required: ['sentiment', 'keyPoints', 'summary', 'tags']
   * };
   *
   * const result = await tabs.generate.json(
   *   'https://example.com/article',
   *   schema,
   *   'Analyze the sentiment (positive/negative/neutral), extract key points, create a brief summary, and add relevant tags'
   * );
   *
   * console.log(result.data.sentiment);  // "positive"
   * console.log(result.data.keyPoints);  // ["Key point 1", "Key point 2", ...]
   * console.log(result.data.summary);    // "Brief summary of the article..."
   * console.log(result.data.tags);       // ["technology", "innovation", ...]
   * ```
   */
  async json<T = unknown>(url: string, schema: Record<string, unknown>, instructions: string, options?: GenerateJsonOptions): Promise<JsonResponse<T>> {
    const requestData: Record<string, unknown> = {
      url,
      json_schema: schema,
      instructions,
    };
    if (options?.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<T>('v1/generate/json', requestData);
    return JsonResponse.fromJSON(response);
  }
}
