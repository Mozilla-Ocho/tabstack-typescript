// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Generate extends APIResource {
  /**
   * Fetches URL content, extracts data, and transforms it using AI based on custom
   * instructions. Use this to generate new content, summaries, or restructured data.
   *
   * @example
   * ```ts
   * const response = await client.generate.json({
   *   instructions:
   *     "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms.",
   *   json_schema: {},
   *   url: 'https://news.ycombinator.com',
   * });
   * ```
   */
  json(body: GenerateJsonParams, options?: RequestOptions): APIPromise<GenerateJsonResponse> {
    return this._client.post('/generate/json', { body, ...options });
  }
}

export type GenerateJsonResponse = { [key: string]: unknown };

export interface GenerateJsonParams {
  /**
   * Instructions describing how to transform the data
   */
  instructions: string;

  /**
   * JSON schema defining the structure of the transformed output
   */
  json_schema: unknown;

  /**
   * URL to fetch content from
   */
  url: string;

  /**
   * Bypass cache and force fresh data retrieval
   */
  nocache?: boolean;
}

export declare namespace Generate {
  export { type GenerateJsonResponse as GenerateJsonResponse, type GenerateJsonParams as GenerateJsonParams };
}
