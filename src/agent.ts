/**
 * Agent client for TABStack AI SDK
 */

import { HTTPClient } from './util/http';
import { AutomateEvent } from './types';

export interface AutomateOptions {
  url?: string;
  data?: Record<string, unknown>;
  guardrails?: string;
  maxIterations?: number;
  maxValidationAttempts?: number;
}

/**
 * Agent client for AI-powered web automation
 *
 * This class provides methods for executing complex web automation tasks using
 * natural language instructions. The automation runs in a browser and streams
 * real-time progress updates.
 */
export class Agent {
  constructor(private httpClient: HTTPClient) {}

  /**
   * Execute AI-powered browser automation task with streaming updates
   *
   * Execute complex web automation tasks using natural language instructions. This method
   * always streams responses using Server-Sent Events (SSE), providing real-time progress
   * updates as the task executes. Perfect for web scraping, form filling, navigation,
   * information gathering, and multi-step workflows.
   *
   * @param task - The task description in natural language. Example: "Find the top 3 trending repositories on GitHub and extract their names, descriptions, and star counts"
   * @param options - Optional automation options
   * @param options.url - Starting URL for the task. Optional but recommended for better context.
   * @param options.data - JSON data to provide context for form filling or complex tasks. Example: { "language": "Python", "timeRange": "today" }
   * @param options.guardrails - Safety constraints for execution. Example: "browse and extract data only, don't star or fork repositories"
   * @param options.maxIterations - Maximum task iterations. Default: 50, Min: 1, Max: 100
   * @param options.maxValidationAttempts - Maximum validation attempts. Default: 3, Min: 1, Max: 10
   *
   * @yields AutomateEvent objects representing different stages of task execution
   *
   * @throws {BadRequestError} When task is missing, URL format is invalid, or maxIterations is out of range
   * @throws {UnauthorizedError} When API key is invalid or missing
   * @throws {ServerError} When automation server call fails
   * @throws {ServiceUnavailableError} When automate service is not available
   *
   * Event Types:
   * - **Task Events**: `start`, `task:setup`, `task:started`, `task:completed`, `task:aborted`, `task:validated`, `task:validation_error`
   * - **Agent Events**: `agent:processing`, `agent:status`, `agent:step`, `agent:action`, `agent:reasoned`, `agent:extracted`, `agent:waiting`
   * - **Browser Events**: `browser:navigated`, `browser:action_started`, `browser:action_completed`, `browser:screenshot_captured`
   * - **System Events**: `system:debug_compression`, `system:debug_message`
   * - **Stream Control**: `complete`, `done`, `error`
   *
   * @example
   * Extract GitHub trending repositories:
   * ```typescript
   * for await (const event of tabs.agent.automate(
   *   'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
   *   {
   *     url: 'https://github.com/trending',
   *     guardrails: 'browse and extract only, don\'t interact with repositories'
   *   }
   * )) {
   *   console.log(`Event: ${event.type}`);
   *
   *   if (event.type === 'task:completed') {
   *     console.log('Result:', event.data.get('finalAnswer'));
   *   } else if (event.type === 'agent:extracted') {
   *     console.log('Extracted data:', event.data.get('extractedData'));
   *   } else if (event.type === 'browser:navigated') {
   *     console.log('Navigated to:', event.data.get('url'));
   *   }
   * }
   * ```
   *
   * @example
   * Scrape product information:
   * ```typescript
   * for await (const event of tabs.agent.automate(
   *   'Find the product name, price, and availability status',
   *   {
   *     url: 'https://example-store.com/product/wireless-headphones',
   *     guardrails: 'extract product details only, don\'t add to cart or checkout',
   *     maxIterations: 20
   *   }
   * )) {
   *   if (event.type === 'agent:processing') {
   *     console.log('Agent thinking:', event.data.get('operation'));
   *   } else if (event.type === 'task:completed') {
   *     const result = event.data.get('finalAnswer');
   *     console.log('Product info:', result);
   *   }
   * }
   * ```
   *
   * @example
   * Fill out contact form:
   * ```typescript
   * for await (const event of tabs.agent.automate(
   *   'Submit the contact form with my information',
   *   {
   *     url: 'https://company.com/contact',
   *     data: {
   *       name: 'Alex Johnson',
   *       email: 'alex@example.com',
   *       message: 'Interested in learning more about your enterprise plan'
   *     },
   *     maxIterations: 30,
   *     maxValidationAttempts: 5
   *   }
   * )) {
   *   if (event.type === 'agent:action') {
   *     console.log('Action:', event.data.get('action'), event.data.get('value'));
   *   } else if (event.type === 'task:completed') {
   *     console.log('Form submitted successfully!');
   *   }
   * }
   * ```
   *
   * @example
   * Handle all event types:
   * ```typescript
   * for await (const event of tabs.agent.automate(
   *   'Research TypeScript frameworks and compare them',
   *   { url: 'https://www.npmjs.com' }
   * )) {
   *   switch (event.type) {
   *     case 'start':
   *       console.log('Task started');
   *       break;
   *     case 'agent:status':
   *       console.log('Status:', event.data.get('message'));
   *       break;
   *     case 'agent:step':
   *       const iteration = event.data.get('currentIteration');
   *       console.log(`Processing step ${iteration}...`);
   *       break;
   *     case 'browser:navigated':
   *       console.log('Page:', event.data.get('title'));
   *       break;
   *     case 'task:completed':
   *       console.log('Final result:', event.data.get('finalAnswer'));
   *       break;
   *     case 'error':
   *       console.error('Error occurred:', event.data.getRaw());
   *       break;
   *   }
   * }
   * ```
   */
  async *automate(
    task: string,
    options?: AutomateOptions
  ): AsyncGenerator<AutomateEvent, void, undefined> {
    const requestData: Record<string, unknown> = {
      task,
      maxIterations: options?.maxIterations ?? 50,
      maxValidationAttempts: options?.maxValidationAttempts ?? 3,
    };

    if (options?.url) requestData.url = options.url;
    if (options?.data) requestData.data = options.data;
    if (options?.guardrails) requestData.guardrails = options.guardrails;

    // Stream the response and parse SSE events
    let currentEventType: string | null = null;
    let currentEventData = '';

    for await (const line of this.httpClient.postStream('v1/automate', requestData)) {
      // SSE format: "event: <type>" or "data: <json>"
      if (line.startsWith('event:')) {
        // If we have a pending event, yield it before starting a new one
        if (currentEventType) {
          yield this.parseEvent(currentEventType, currentEventData);
          currentEventData = '';
        }

        // Extract event type
        currentEventType = line.slice(6).trim();
      } else if (line.startsWith('data:')) {
        // Accumulate event data (can be multiline)
        const dataLine = line.slice(5).trim();
        if (currentEventData) {
          currentEventData += '\n' + dataLine;
        } else {
          currentEventData = dataLine;
        }
      } else if (line === '') {
        // Empty line marks the end of an event
        if (currentEventType) {
          yield this.parseEvent(currentEventType, currentEventData);
          currentEventType = null;
          currentEventData = '';
        }
      }
    }

    // Yield any remaining event
    if (currentEventType) {
      yield this.parseEvent(currentEventType, currentEventData);
    }
  }

  /**
   * Parse SSE event data
   */
  private parseEvent(eventType: string, eventData: string): AutomateEvent {
    try {
      const data = JSON.parse(eventData) as Record<string, unknown>;
      return AutomateEvent.fromJSON(eventType, data);
    } catch {
      // If data is not valid JSON, return it as-is
      return AutomateEvent.fromJSON(eventType, { raw: eventData });
    }
  }
}
