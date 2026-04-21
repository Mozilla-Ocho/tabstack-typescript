// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { Stream } from '../core/streaming';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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
      __synthesizeEventData: true,
    }) as APIPromise<Stream<AutomateEvent>>;
  }

  /**
   * Submit a response to an interactive form data request from an in-progress
   * automation task. When the AI agent encounters a form requiring user data, it
   * emits an `interactive:form_data:request` or `interactive:form_data:error` SSE
   * event containing a `requestId`. Use this endpoint to provide the requested data
   * or cancel the request.
   *
   * **Lifecycle:**
   *
   * - Input requests expire after 2 minutes by default
   * - Expired or already-answered requests return `410 Gone`
   * - Successful submissions return `202 Accepted` (fire-and-forget from caller's
   *   perspective)
   *
   * @example
   * ```ts
   * const response = await client.agent.automateInput(
   *   'requestID',
   * );
   * ```
   */
  automateInput(
    requestID: string,
    body: AgentAutomateInputParams,
    options?: RequestOptions,
  ): APIPromise<AgentAutomateInputResponse> {
    return this._client.post(path`/automate/${requestID}/input`, { body, ...options });
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
      __synthesizeEventData: true,
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
   * The event type (e.g., start, planning:start, searching:end, complete)
   */
  event?: string;
}

export interface AgentAutomateInputResponse {
  status?: string;
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

export interface AgentAutomateInputParams {
  /**
   * Set to true to cancel/decline the request
   */
  cancelled?: boolean;

  /**
   * Field values as array of {ref, value} pairs (required when not cancelled)
   */
  fields?: Array<AgentAutomateInputParams.Field>;
}

export namespace AgentAutomateInputParams {
  export interface Field {
    ref?: string;

    value?: string;
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
    type AgentAutomateInputResponse as AgentAutomateInputResponse,
    type AgentAutomateParams as AgentAutomateParams,
    type AgentAutomateInputParams as AgentAutomateInputParams,
    type AgentResearchParams as AgentResearchParams,
  };
}
