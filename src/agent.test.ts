/**
 * Tests for Agent
 */

// @ts-nocheck
import { Agent } from './agent';
import { HTTPClient } from './util/http';
import { AutomateEvent } from './types';

// Mock HTTPClient
jest.mock('./util/http');

describe('Agent', () => {
  let agent: Agent;
  let mockHttpClient: jest.Mocked<HTTPClient>;

  beforeEach(() => {
    mockHttpClient = new HTTPClient({ apiKey: 'test-key' }) as jest.Mocked<HTTPClient>;
    agent = new Agent(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper to create async generator from array
  async function* streamLines(lines: string[]): AsyncGenerator<string, void, undefined> {
    for (const line of lines) {
      yield line;
    }
  }

  describe('automate', () => {
    it('should execute task with minimal options', async () => {
      const sseLines = [
        'event: start',
        'data: {"message":"Task started"}',
        '',
        'event: task:completed',
        'data: {"finalAnswer":"Result"}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Test task')) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Test task',
        maxIterations: 50,
        maxValidationAttempts: 3,
      });
      expect(events).toHaveLength(2);
      expect(events[0].type).toBe('start');
      expect(events[1].type).toBe('task:completed');
    });

    it('should execute task with url option', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Test task', {
        url: 'https://example.com',
      })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Test task',
        url: 'https://example.com',
        maxIterations: 50,
        maxValidationAttempts: 3,
      });
    });

    it('should execute task with data option', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const data = { name: 'John', email: 'john@example.com' };

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Fill form', { data })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Fill form',
        data,
        maxIterations: 50,
        maxValidationAttempts: 3,
      });
    });

    it('should execute task with guardrails option', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Browse site', {
        guardrails: 'read only, no modifications',
      })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Browse site',
        guardrails: 'read only, no modifications',
        maxIterations: 50,
        maxValidationAttempts: 3,
      });
    });

    it('should execute task with custom maxIterations', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Test task', { maxIterations: 100 })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Test task',
        maxIterations: 100,
        maxValidationAttempts: 3,
      });
    });

    it('should execute task with custom maxValidationAttempts', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Test task', { maxValidationAttempts: 5 })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Test task',
        maxIterations: 50,
        maxValidationAttempts: 5,
      });
    });

    it('should execute task with all options', async () => {
      const sseLines = ['event: start', 'data: {}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Complete task', {
        url: 'https://example.com',
        data: { key: 'value' },
        guardrails: 'safe mode',
        maxIterations: 75,
        maxValidationAttempts: 4,
      })) {
        events.push(event);
      }

      expect(mockHttpClient.postStream).toHaveBeenCalledWith('v1/automate', {
        task: 'Complete task',
        url: 'https://example.com',
        data: { key: 'value' },
        guardrails: 'safe mode',
        maxIterations: 75,
        maxValidationAttempts: 4,
      });
    });
  });

  describe('SSE parsing', () => {
    it('should parse single event', async () => {
      const sseLines = ['event: start', 'data: {"message":"Started"}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('start');
      expect(events[0].data.get('message')).toBe('Started');
    });

    it('should parse multiple events', async () => {
      const sseLines = [
        'event: start',
        'data: {"step":1}',
        '',
        'event: agent:processing',
        'data: {"operation":"analyze"}',
        '',
        'event: task:completed',
        'data: {"finalAnswer":"Done"}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(3);
      expect(events[0].type).toBe('start');
      expect(events[1].type).toBe('agent:processing');
      expect(events[2].type).toBe('task:completed');
    });

    it('should handle multiline data', async () => {
      const sseLines = [
        'event: agent:extracted',
        'data: {"items":[',
        'data: {"name":"Item1"},',
        'data: {"name":"Item2"}',
        'data: ]}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('agent:extracted');
      // Data should be concatenated with newlines
      const data = events[0].data.getRaw();
      expect(data).toBeDefined();
    });

    it('should handle events without empty line separator', async () => {
      const sseLines = ['event: start', 'data: {"message":"Started"}'];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      // Should still yield the last event even without trailing empty line
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('start');
    });

    it('should handle events with extra whitespace', async () => {
      const sseLines = ['event:  start  ', 'data:  {"message":"Test"}  ', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('start');
      expect(events[0].data.get('message')).toBe('Test');
    });

    it('should skip empty lines between data', async () => {
      const sseLines = ['event: start', '', 'data: {"message":"Test"}', '', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('start');
    });

    it('should handle different event types', async () => {
      const eventTypes = [
        'start',
        'task:setup',
        'task:started',
        'task:completed',
        'agent:processing',
        'agent:status',
        'agent:step',
        'agent:action',
        'browser:navigated',
        'complete',
        'done',
        'error',
      ];

      const sseLines: string[] = [];
      eventTypes.forEach((type) => {
        sseLines.push(`event: ${type}`);
        sseLines.push('data: {}');
        sseLines.push('');
      });

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(eventTypes.length);
      events.forEach((event, index) => {
        expect(event.type).toBe(eventTypes[index]);
      });
    });
  });

  describe('parseEvent', () => {
    it('should parse valid JSON data', async () => {
      const sseLines = [
        'event: agent:extracted',
        'data: {"extractedData":{"title":"Test","count":42}}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events[0].data.get('extractedData')).toEqual({ title: 'Test', count: 42 });
    });

    it('should handle invalid JSON gracefully', async () => {
      const sseLines = ['event: error', 'data: Invalid JSON {{{', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events[0].type).toBe('error');
      expect(events[0].data.get('raw')).toBe('Invalid JSON {{{');
    });

    it('should handle empty data', async () => {
      const sseLines = ['event: start', 'data: ', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('start');
    });

    it('should handle complex nested JSON', async () => {
      const complexData = {
        result: {
          items: [
            { id: 1, name: 'Item 1', tags: ['a', 'b'] },
            { id: 2, name: 'Item 2', tags: ['c', 'd'] },
          ],
          metadata: { count: 2, timestamp: 1234567890 },
        },
      };

      const sseLines = ['event: agent:extracted', `data: ${JSON.stringify(complexData)}`, ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events[0].data.get('result')).toEqual(complexData.result);
    });
  });

  describe('Event data access', () => {
    it('should access event data properties', async () => {
      const sseLines = [
        'event: browser:navigated',
        'data: {"url":"https://example.com","title":"Example"}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events[0].data.get('url')).toBe('https://example.com');
      expect(events[0].data.get('title')).toBe('Example');
    });

    it('should handle missing properties', async () => {
      const sseLines = ['event: start', 'data: {"message":"Test"}', ''];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events[0].data.get('nonexistent')).toBeUndefined();
      expect(events[0].data.get('nonexistent', 'default')).toBe('default');
    });

    it('should access raw event data', async () => {
      const sseLines = [
        'event: agent:step',
        'data: {"currentIteration":5,"totalIterations":50}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      const raw = events[0].data.getRaw();
      expect(raw.currentIteration).toBe(5);
      expect(raw.totalIterations).toBe(50);
    });
  });

  describe('Integration scenarios', () => {
    it('should stream complete automation workflow', async () => {
      const sseLines = [
        'event: start',
        'data: {"message":"Starting automation"}',
        '',
        'event: task:setup',
        'data: {"task":"Extract data"}',
        '',
        'event: browser:navigated',
        'data: {"url":"https://example.com"}',
        '',
        'event: agent:processing',
        'data: {"operation":"analyze"}',
        '',
        'event: agent:extracted',
        'data: {"extractedData":{"items":[]}}',
        '',
        'event: task:completed',
        'data: {"finalAnswer":"Success"}',
        '',
        'event: done',
        'data: {}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Extract data', {
        url: 'https://example.com',
      })) {
        events.push(event);
      }

      expect(events).toHaveLength(7);
      expect(events[0]?.type).toBe('start');
      expect(events[events.length - 2]?.type).toBe('task:completed');
      expect(events[events.length - 1]?.type).toBe('done');
    });

    it('should handle error events', async () => {
      const sseLines = [
        'event: start',
        'data: {"message":"Started"}',
        '',
        'event: error',
        'data: {"error":"Task failed","reason":"Network error"}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task')) {
        events.push(event);
      }

      expect(events).toHaveLength(2);
      expect(events[1]?.type).toBe('error');
      expect(events[1]?.data.get('error')).toBe('Task failed');
    });

    it('should handle task abortion', async () => {
      const sseLines = [
        'event: start',
        'data: {}',
        '',
        'event: task:aborted',
        'data: {"reason":"Max iterations exceeded"}',
        '',
      ];

      mockHttpClient.postStream = jest.fn().mockReturnValue(streamLines(sseLines));

      const events: AutomateEvent[] = [];
      for await (const event of agent.automate('Task', { maxIterations: 10 })) {
        events.push(event);
      }

      expect(events).toHaveLength(2);
      expect(events[1]?.type).toBe('task:aborted');
    });

    it('should propagate HTTP client errors', async () => {
      const error = new Error('Stream error');
      mockHttpClient.postStream = jest.fn().mockImplementation(async function* () {
        throw error;
      });

      const generator = agent.automate('Task');
      await expect(generator.next()).rejects.toThrow('Stream error');
    });
  });
});
