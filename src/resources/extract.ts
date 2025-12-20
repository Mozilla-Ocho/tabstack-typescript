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
   * const response = await client.extract.json({
   *   json_schema: {},
   *   url: 'https://news.ycombinator.com',
   * });
   * ```
   */
  json(body: ExtractJsonParams, options?: RequestOptions): APIPromise<ExtractJsonResponse> {
    return this._client.post('/extract/json', { body, ...options });
  }

  /**
   * Fetches a URL and converts its HTML content to clean Markdown format with
   * optional metadata extraction
   *
   * @example
   * ```ts
   * const response = await client.extract.markdown({
   *   url: 'https://example.com/blog/article',
   * });
   * ```
   */
  markdown(body: ExtractMarkdownParams, options?: RequestOptions): APIPromise<ExtractMarkdownResponse> {
    return this._client.post('/extract/markdown', { body, ...options });
  }
}

export type ExtractJsonResponse = { [key: string]: unknown };

export interface ExtractMarkdownResponse {
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
  metadata?: ExtractMarkdownResponse.Metadata;
}

export namespace ExtractMarkdownResponse {
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

export interface ExtractJsonParams {
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

export interface ExtractMarkdownParams {
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
    type ExtractJsonResponse as ExtractJsonResponse,
    type ExtractMarkdownResponse as ExtractMarkdownResponse,
    type ExtractJsonParams as ExtractJsonParams,
    type ExtractMarkdownParams as ExtractMarkdownParams,
  };
}
