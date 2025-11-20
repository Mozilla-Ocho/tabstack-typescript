/**
 * Main client for Tabstack SDK
 */

import { HTTPClient } from './util/http';
import { Extract } from './extract';
import { Generate } from './generate';
import { Agent } from './agent';

export interface TabstackOptions {
  apiKey: string;
  baseURL?: string;
}

/**
 * Tabstack client for web content extraction, generation, and automation
 *
 * This is the main entry point for the Tabstack SDK. Initialize it with your
 * API key to access the extract, generate, and automate operators.
 *
 * @example
 * ```typescript
 * import { Tabstack } from '@tabstack/sdk';
 *
 * const tabs = new Tabstack({
 *   apiKey: process.env.TABSTACK_API_KEY!
 * });
 *
 * const result = await tabs.extract.markdown('https://example.com');
 * console.log(result.content);
 * ```
 */
export class Tabstack {
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
   * Agent client for AI-powered browser automation tasks
   */
  public readonly agent: Agent;

  /**
   * Initialize Tabstack client
   *
   * @param options - Configuration options
   * @throws Error if apiKey is empty or not provided
   *
   * @example
   * ```typescript
   * const tabs = new Tabstack({
   *   apiKey: 'your-api-key-here'
   * });
   * ```
   */
  constructor(options: TabstackOptions) {
    if (!options.apiKey || typeof options.apiKey !== 'string') {
      throw new Error('apiKey is required');
    }

    this.httpClient = new HTTPClient({
      apiKey: options.apiKey,
      baseURL: options.baseURL,
    });

    // Initialize operators
    this.extract = new Extract(this.httpClient);
    this.generate = new Generate(this.httpClient);
    this.agent = new Agent(this.httpClient);
  }
}
