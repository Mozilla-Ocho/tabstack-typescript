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
   *   json_schema: {
   *     properties: {
   *       summaries: {
   *         items: {
   *           properties: {
   *             category: {
   *               description: 'Story category (tech/business/science/etc)',
   *               type: 'string',
   *             },
   *             summary: { description: 'One-sentence summary of the story', type: 'string' },
   *             title: { description: 'Story title', type: 'string' },
   *           },
   *           type: 'object',
   *         },
   *         type: 'array',
   *       },
   *     },
   *     type: 'object',
   *   },
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
   * Instructions describing how to transform the data. Maximum 20,000 characters.
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
   * Fetch effort level controlling speed vs. capability tradeoff. "min": fastest, no
   * fallback (1-5s). "standard": balanced with enhanced reliability (default,
   * 3-15s). "max": full browser rendering for JS-heavy sites (15-60s).
   */
  effort?: 'min' | 'standard' | 'max';

  /**
   * Optional geotargeting parameters for proxy requests
   */
  geo_target?: GenerateJsonParams.GeoTarget;

  /**
   * Bypass cache and force fresh data retrieval
   */
  nocache?: boolean;
}

export namespace GenerateJsonParams {
  /**
   * Optional geotargeting parameters for proxy requests
   */
  export interface GeoTarget {
    /**
     * Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., "US", "GB",
     * "JP"). See: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     */
    country?: string;
  }
}

export declare namespace Generate {
  export { type GenerateJsonResponse as GenerateJsonResponse, type GenerateJsonParams as GenerateJsonParams };
}
