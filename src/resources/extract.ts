// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Extract extends APIResource {
  /**
   * Fetches a URL and extracts structured data according to a provided JSON schema
   *
   * @example
   * ```ts
   * const response = await client.extract.createJson({
   *   json_schema: {
   *     type: 'object',
   *     properties: {
   *       stories: {
   *         type: 'array',
   *         items: {
   *           type: 'object',
   *           properties: {
   *             title: {
   *               type: 'string',
   *               description: 'Story title',
   *             },
   *             points: {
   *               type: 'number',
   *               description: 'Story points',
   *             },
   *             author: {
   *               type: 'string',
   *               description: 'Author username',
   *             },
   *           },
   *         },
   *       },
   *     },
   *   },
   *   url: 'https://news.ycombinator.com',
   * });
   * ```
   */
  createJson(body: ExtractCreateJsonParams, options?: RequestOptions): APIPromise<ExtractCreateJsonResponse> {
    return this._client.post('/extract/json', { body, ...options });
  }

  /**
   * Fetches a URL and converts its HTML content to clean Markdown format with
   * optional metadata extraction
   *
   * @example
   * ```ts
   * const response = await client.extract.createMarkdown({
   *   url: 'https://example.com/blog/article',
   * });
   * ```
   */
  createMarkdown(
    body: ExtractCreateMarkdownParams,
    options?: RequestOptions,
  ): APIPromise<ExtractCreateMarkdownResponse> {
    return this._client.post('/extract/markdown', { body, ...options });
  }
}

/**
 * The extracted data matching the provided schema
 */
export type ExtractCreateJsonResponse = { [key: string]: unknown };

export interface ExtractCreateMarkdownResponse {
  /**
   * The markdown content (includes metadata as YAML frontmatter by default)
   */
  content: string;

  /**
   * The URL that was converted to markdown
   */
  url: string;

  /**
   * Extracted metadata from the page (only included when metadata parameter is true)
   */
  metadata?: ExtractCreateMarkdownResponse.Metadata;
}

export namespace ExtractCreateMarkdownResponse {
  /**
   * Extracted metadata from the page (only included when metadata parameter is true)
   */
  export interface Metadata {
    /**
     * Author information from HTML metadata
     */
    author?: string;

    /**
     * Page description from Open Graph or HTML
     */
    description?: string;

    /**
     * Featured image URL from Open Graph
     */
    image?: string;

    /**
     * Publisher information from Open Graph
     */
    publisher?: string;

    /**
     * Site name from Open Graph
     */
    site_name?: string;

    /**
     * Page title from Open Graph or HTML
     */
    title?: string;

    /**
     * Content type from Open Graph (e.g., article, website)
     */
    type?: string;

    /**
     * Canonical URL from Open Graph
     */
    url?: string;
  }
}

export interface ExtractCreateJsonParams {
  /**
   * JSON schema definition that describes the structure of data to extract.
   */
  json_schema: unknown;

  /**
   * URL to fetch and extract data from
   */
  url: string;

  /**
   * Bypass cache and force fresh data retrieval
   */
  nocache?: boolean;
}

export interface ExtractCreateMarkdownParams {
  /**
   * URL to fetch and convert to markdown
   */
  url: string;

  /**
   * Include extracted metadata (Open Graph and HTML metadata) as a separate field in
   * the response
   */
  metadata?: boolean;

  /**
   * Bypass cache and force fresh data retrieval
   */
  nocache?: boolean;
}

export declare namespace Extract {
  export {
    type ExtractCreateJsonResponse as ExtractCreateJsonResponse,
    type ExtractCreateMarkdownResponse as ExtractCreateMarkdownResponse,
    type ExtractCreateJsonParams as ExtractCreateJsonParams,
    type ExtractCreateMarkdownParams as ExtractCreateMarkdownParams,
  };
}
