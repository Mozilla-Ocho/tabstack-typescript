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
   * const response = await client.generate.createJson({
   *   instructions:
   *     "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms.",
   *   json_schema: {
   *     type: 'object',
   *     properties: {
   *       summaries: {
   *         type: 'array',
   *         items: {
   *           type: 'object',
   *           properties: {
   *             title: { type: 'string', description: 'Story title' },
   *             category: {
   *               type: 'string',
   *               description: 'Story category (tech/business/science/etc)',
   *             },
   *             summary: { type: 'string', description: 'One-sentence summary of the story' },
   *           },
   *         },
   *       },
   *     },
   *   },
   *   url: 'https://news.ycombinator.com',
   * });
   * ```
   */
  createJson(
    body: GenerateCreateJsonParams,
    options?: RequestOptions,
  ): APIPromise<GenerateCreateJsonResponse> {
    return this._client.post('/generate/json', { body, ...options });
  }
}

/**
 * The transformed data matching the provided schema
 */
export type GenerateCreateJsonResponse = { [key: string]: unknown };

export interface GenerateCreateJsonParams {
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
  export {
    type GenerateCreateJsonResponse as GenerateCreateJsonResponse,
    type GenerateCreateJsonParams as GenerateCreateJsonParams,
  };
}
