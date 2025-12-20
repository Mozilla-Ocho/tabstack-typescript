// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Agent extends APIResource {
  /**
   * Execute AI-powered browser automation tasks using natural language. This
   * endpoint **always streams** responses using Server-Sent Events (SSE).
   *
   * **Streaming Response:**
   *
   * - All responses are streamed using Server-Sent Events (`text/event-stream`)
   * - Real-time progress updates and results as they're generated
   *
   * **Use Cases:**
   *
   * - Web scraping and data extraction
   * - Form filling and interaction
   * - Navigation and information gathering
   * - Multi-step web workflows
   * - Content analysis from web pages
   *
   * @example
   * ```ts
   * const response = await client.agent.automate({
   *   task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
   *   guardrails:
   *     "browse and extract only, don't interact with repositories",
   *   url: 'https://github.com/trending',
   * });
   * ```
   */
  automate(body: AgentAutomateParams, options?: RequestOptions): APIPromise<Stream<AgentAutomateResponse>> {
    return this._client.post('/automate', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<AgentAutomateResponse>>;
  }
}

export interface AgentAutomateResponse {
  /**
   * Event payload data
   */
  data?: unknown;

  /**
   * The event type (e.g., start, agent:processing, complete)
   */
  event?: string;
}

export interface AgentAutomateParams {
  /**
   * The task description in natural language
   */
  task: string;

  /**
   * JSON data to provide context for form filling or complex tasks
   */
  data?: unknown;

  /**
   * Safety constraints for execution
   */
  guardrails?: string;

  /**
   * Maximum task iterations
   */
  maxIterations?: number;

  /**
   * Maximum validation attempts
   */
  maxValidationAttempts?: number;

  /**
   * Starting URL for the task
   */
  url?: string;
}

export declare namespace Agent {
  export {
    type AgentAutomateResponse as AgentAutomateResponse,
    type AgentAutomateParams as AgentAutomateParams,
  };
}
