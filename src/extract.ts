/**
 * Extract operator for TABStack AI SDK
 */

import { HTTPClient } from './util/http';
import { MarkdownResponse, JsonResponse } from './types';

export interface ExtractMarkdownOptions {
  metadata?: boolean;
  nocache?: boolean;
}

export interface ExtractJsonOptions {
  nocache?: boolean;
}

/**
 * Extract operator for converting and extracting web content
 *
 * This class provides methods for extracting content from URLs in various formats:
 * - Markdown conversion
 * - Structured JSON extraction
 */
export class Extract {
  constructor(private httpClient: HTTPClient) {}

  /**
   * Convert URL content to Markdown format
   *
   * Fetches a URL and converts its HTML content to clean Markdown format with
   * optional metadata extraction. By default, metadata is included in the content
   * as YAML frontmatter. When metadata option is true, it's also returned as
   * a separate field in the response.
   *
   * @param url - URL to fetch and convert to markdown
   * @param options - Optional extraction options
   * @param options.metadata - Include extracted metadata (Open Graph and HTML metadata) as a separate field in the response. Default: false
   * @param options.nocache - Bypass cache and force fresh data retrieval. Default: false
   *
   * @returns MarkdownResponse containing the converted content and optional metadata
   *
   * @throws {BadRequestError} When URL is missing
   * @throws {UnauthorizedError} When API key is invalid or missing
   * @throws {InvalidURLError} When URL is invalid or inaccessible
   * @throws {ServerError} When server fails to fetch or convert the content
   *
   * @example
   * Basic usage:
   * ```typescript
   * const result = await tabs.extract.markdown('https://example.com/blog/article');
   * console.log(result.content); // Markdown with YAML frontmatter
   * ```
   *
   * @example
   * With separate metadata field:
   * ```typescript
   * const result = await tabs.extract.markdown('https://example.com/blog/article', {
   *   metadata: true
   * });
   * console.log(result.content);          // Markdown without frontmatter
   * console.log(result.metadata?.title);  // "Example Article Title"
   * console.log(result.metadata?.author); // "Example Author"
   * console.log(result.metadata?.image);  // "https://example.com/images/article.jpg"
   * ```
   *
   * @example
   * Force fresh data retrieval:
   * ```typescript
   * const result = await tabs.extract.markdown('https://example.com/blog/article', {
   *   nocache: true
   * });
   * ```
   */
  async markdown(url: string, options?: ExtractMarkdownOptions): Promise<MarkdownResponse> {
    const requestData: Record<string, unknown> = { url };
    if (options?.metadata) requestData.metadata = options.metadata;
    if (options?.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<Record<string, unknown>>(
      'v1/extract/markdown',
      requestData
    );
    return MarkdownResponse.fromJSON(response);
  }

  /**
   * Extract structured JSON from URL content
   *
   * Fetches a URL and extracts structured data according to a provided JSON schema.
   * The schema defines what data to extract and its structure.
   *
   * @param url - URL to fetch and extract data from
   * @param schema - JSON schema object defining the structure of data to extract
   * @param options - Optional extraction options
   * @param options.nocache - Bypass cache and force fresh data retrieval. Default: false
   *
   * @returns JsonResponse containing the extracted data matching the schema
   *
   * @throws {BadRequestError} When URL or schema is missing, or schema format is invalid
   * @throws {UnauthorizedError} When API key is invalid or missing
   * @throws {InvalidURLError} When URL is invalid
   * @throws {ServerError} When server fails to fetch URL, page is too large, or JSON generation fails
   *
   * @example
   * Extract news stories:
   * ```typescript
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
   *         },
   *         required: ['title', 'points', 'author']
   *       }
   *     }
   *   },
   *   required: ['stories']
   * };
   *
   * const result = await tabs.extract.json('https://news.ycombinator.com', schema);
   * console.log(result.data.stories); // Array of story objects
   * ```
   *
   * @example
   * Extract product information:
   * ```typescript
   * const schema = {
   *   type: 'object',
   *   properties: {
   *     name: { type: 'string' },
   *     price: { type: 'number' },
   *     inStock: { type: 'boolean' },
   *     features: {
   *       type: 'array',
   *       items: { type: 'string' }
   *     }
   *   },
   *   required: ['name', 'price', 'inStock']
   * };
   *
   * const result = await tabs.extract.json(
   *   'https://example-store.com/product/wireless-headphones',
   *   schema
   * );
   * console.log(result.data.name);     // "Premium Wireless Headphones"
   * console.log(result.data.price);    // 299.99
   * console.log(result.data.inStock);  // true
   * ```
   *
   * @example
   * Force fresh data retrieval:
   * ```typescript
   * const result = await tabs.extract.json('https://news.ycombinator.com', schema, {
   *   nocache: true
   * });
   * ```
   */
  async json<T = unknown>(
    url: string,
    schema: Record<string, unknown>,
    options?: ExtractJsonOptions
  ): Promise<JsonResponse<T>> {
    const requestData: Record<string, unknown> = {
      url,
      json_schema: schema,
    };
    if (options?.nocache) requestData.nocache = options.nocache;

    const response = await this.httpClient.post<T>('v1/extract/json', requestData);
    return JsonResponse.fromJSON(response);
  }
}
