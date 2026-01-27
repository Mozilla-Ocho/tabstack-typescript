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
     * Document creation date (ISO 8601)
     */
    created_at?: string;

    /**
     * Creator application (e.g., "Microsoft Word")
     */
    creator?: string;

    /**
     * Page description from Open Graph or HTML
     */
    description?: string;

    /**
     * Featured image URL from Open Graph
     */
    image?: string;

    /**
     * PDF keywords as array
     */
    keywords?: Array<string>;

    /**
     * Document modification date (ISO 8601)
     */
    modified_at?: string;

    /**
     * Number of pages (PDF documents)
     */
    page_count?: number;

    /**
     * PDF version (e.g., "1.5")
     */
    pdf_version?: string;

    /**
     * PDF producer software (e.g., "Adobe PDF Library")
     */
    producer?: string;

    /**
     * Publisher information from Open Graph
     */
    publisher?: string;

    /**
     * Site name from Open Graph
     */
    site_name?: string;

    /**
     * PDF-specific metadata fields (populated for PDF documents) PDF subject or
     * summary
     */
    subject?: string;

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
   * Optional geotargeting parameters for proxy requests
   */
  geo_target?: ExtractJsonParams.GeoTarget;

  /**
   * Bypass cache and force fresh data retrieval
   */
  nocache?: boolean;
}

export namespace ExtractJsonParams {
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

export interface ExtractMarkdownParams {
  /**
   * URL to fetch and convert to markdown
   */
  url: string;

  /**
   * Optional geotargeting parameters for proxy requests
   */
  geo_target?: ExtractMarkdownParams.GeoTarget;

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

export namespace ExtractMarkdownParams {
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

export declare namespace Extract {
  export {
    type ExtractJsonResponse as ExtractJsonResponse,
    type ExtractMarkdownResponse as ExtractMarkdownResponse,
    type ExtractJsonParams as ExtractJsonParams,
    type ExtractMarkdownParams as ExtractMarkdownParams,
  };
}
