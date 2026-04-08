// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Agent extends APIResource {
  /**
   * Execute AI-powered browser automation tasks using natural language with optional
   * geotargeting. This endpoint **always streams** responses using Server-Sent
   * Events (SSE).
   *
   * **Streaming Response:**
   *
   * - All responses are streamed using Server-Sent Events (`text/event-stream`)
   * - Real-time progress updates and results as they're generated
   *
   * **Geotargeting:**
   *
   * - Optionally specify a country code for geotargeted browsing
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
   * const automateEvent = await client.agent.automate({
   *   task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
   *   guardrails:
   *     "browse and extract only, don't interact with repositories",
   *   url: 'https://github.com/trending',
   * });
   * ```
   */
  automate(body: AgentAutomateParams, options?: RequestOptions): APIPromise<Stream<AutomateEvent>> {
    return this._client.post('/automate', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<AutomateEvent>>;
  }

  /**
   * Execute AI-powered research queries that search the web, analyze sources, and
   * synthesize comprehensive answers. This endpoint **always streams** responses
   * using Server-Sent Events (SSE).
   *
   * **Streaming Response:**
   *
   * - All responses are streamed using Server-Sent Events (`text/event-stream`)
   * - Real-time progress updates as research progresses through phases
   *
   * **Research Modes:**
   *
   * - `fast` - Quick answers with minimal web searches
   * - `balanced` - Standard research with multiple iterations (default)
   *
   * **Use Cases:**
   *
   * - Answering complex questions with cited sources
   * - Synthesizing information from multiple web sources
   * - Research reports on specific topics
   * - Fact-checking and verification tasks
   *
   * @example
   * ```ts
   * const researchEvent = await client.agent.research({
   *   query:
   *     'What are the latest developments in quantum computing?',
   * });
   * ```
   */
  research(body: AgentResearchParams, options?: RequestOptions): APIPromise<Stream<ResearchEvent>> {
    return this._client.post('/research', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: 'text/event-stream' }, options?.headers]),
      stream: true,
    }) as APIPromise<Stream<ResearchEvent>>;
  }
}

export interface AutomateEvent {
  /**
   * Event payload data
   */
  data?: unknown;

  /**
   * The event type (e.g., start, agent:processing, complete)
   */
  event?: string;
}

export interface ResearchEvent {
  /**
   * Event payload data
   */
  data?: unknown;

  /**
   * The event type: phase, progress, complete, or error
   */
  event?: 'phase' | 'progress' | 'complete' | 'error';
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
   * Optional geotargeting parameters for proxy requests
   */
  geo_target?: AgentAutomateParams.GeoTarget;

  /**
   * Safety constraints for execution
   */
  guardrails?: string;

  /**
   * Enable interactive mode to allow human-in-the-loop input during task execution
   */
  interactive?: boolean;

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

export namespace AgentAutomateParams {
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

export interface AgentResearchParams {
  /**
   * The research query or question to answer
   */
  query: string;

  /**
   * Timeout in seconds for fetching web pages
   */
  fetch_timeout?: number;

  /**
   * Research mode: fast (quick answers), balanced (standard research, default)
   */
  mode?: 'fast' | 'balanced';

  /**
   * Skip cache and force fresh research
   */
  nocache?: boolean;
}

export declare namespace Agent {
  export {
    type AutomateEvent as AutomateEvent,
    type ResearchEvent as ResearchEvent,
    type AgentAutomateParams as AgentAutomateParams,
    type AgentResearchParams as AgentResearchParams,
  };
}
