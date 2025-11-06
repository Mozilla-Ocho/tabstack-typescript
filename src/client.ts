/**
 * Main client for TABStack AI SDK
 */

import { HTTPClient } from './http-client';
import { Extract } from './extract';
import { Generate } from './generate';
import { Automate } from './automate';

export interface TABStackOptions {
  apiKey: string;
  baseURL?: string;
}

/**
 * TABStack AI client for web content extraction, generation, and automation
 *
 * This is the main entry point for the TABStack AI SDK. Initialize it with your
 * API key to access the extract, generate, and automate operators.
 *
 * @example
 * ```typescript
 * import { TABStack } from '@tabstack/sdk';
 *
 * const tabs = new TABStack({
 *   apiKey: process.env.TABSTACK_API_KEY!
 * });
 *
 * const result = await tabs.extract.markdown('https://example.com');
 * console.log(result.content);
 * ```
 */
export class TABStack {
  private httpClient: HTTPClient;

  /**
   * Extract operator for converting and extracting web content
   */
  public readonly extract: Extract;

  /**
   * Generate operator for AI-powered content transformation
   */
  public readonly generate: Generate;

  /**
   * Automate operator for browser automation tasks
   */
  public readonly automate: Automate;

  /**
   * Initialize TABStack client
   *
   * @param options - Configuration options
   * @throws Error if apiKey is empty or not provided
   *
   * @example
   * ```typescript
   * const tabs = new TABStack({
   *   apiKey: 'your-api-key-here'
   * });
   * ```
   */
  constructor(options: TABStackOptions) {
    if (!options.apiKey) {
      throw new Error('apiKey is required');
    }

    this.httpClient = new HTTPClient({
      apiKey: options.apiKey,
      baseURL: options.baseURL,
    });

    // Initialize operators
    this.extract = new Extract(this.httpClient);
    this.generate = new Generate(this.httpClient);
    this.automate = new Automate(this.httpClient);
  }
}
