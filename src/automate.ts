/**
 * Automate operator for TABStack AI SDK
 */

import { HTTPClient } from './http-client';
import { AutomateEvent } from './types';

export interface AutomateExecuteOptions {
  task: string;
  url?: string;
  data?: Record<string, unknown>;
  guardrails?: string;
  maxIterations?: number;
  maxValidationAttempts?: number;
}

/**
 * Automate operator for AI-powered web automation
 *
 * This class provides methods for executing complex web automation tasks using
 * natural language instructions. The automation runs in a browser and streams
 * real-time progress updates.
 */
export class Automate {
  constructor(private httpClient: HTTPClient) {}

  /**
   * Execute AI-powered browser automation task with streaming updates
   *
   * This method streams real-time progress updates as Server-Sent Events (SSE).
   * Use this for web scraping, form filling, navigation, and multi-step workflows.
   *
   * @param options - Automation options
   * @yields AutomateEvent objects representing different stages of task execution
   *
   * @example
   * ```typescript
   * for await (const event of tabs.automate.execute({
   *   task: 'Find the top 3 trending repositories and extract their details',
   *   url: 'https://github.com/trending',
   *   guardrails: 'browse and extract only'
   * })) {
   *   if (event.type === 'task:completed') {
   *     console.log('Result:', event.data.get('finalAnswer'));
   *   } else if (event.type === 'agent:extracted') {
   *     console.log('Extracted:', event.data.get('extractedData'));
   *   }
   * }
   * ```
   */
  async *execute(options: AutomateExecuteOptions): AsyncGenerator<AutomateEvent, void, undefined> {
    const requestData: Record<string, unknown> = {
      task: options.task,
      maxIterations: options.maxIterations ?? 50,
      maxValidationAttempts: options.maxValidationAttempts ?? 3,
    };

    if (options.url) requestData.url = options.url;
    if (options.data) requestData.data = options.data;
    if (options.guardrails) requestData.guardrails = options.guardrails;

    // Stream the response and parse SSE events
    let currentEventType: string | null = null;
    let currentEventData = '';

    for await (const line of this.httpClient.postStream('v1/automate', requestData)) {
      // SSE format: "event: <type>" or "data: <json>"
      if (line.startsWith('event:')) {
        // If we have a pending event, yield it before starting a new one
        if (currentEventType && currentEventData) {
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
        if (currentEventType && currentEventData) {
          yield this.parseEvent(currentEventType, currentEventData);
          currentEventType = null;
          currentEventData = '';
        }
      }
    }

    // Yield any remaining event
    if (currentEventType && currentEventData) {
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
