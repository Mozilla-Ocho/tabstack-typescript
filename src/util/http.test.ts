/**
 * Tests for HTTPClient
 */

import nock from 'nock';
import { HTTPClient } from './http';
import {
  TabstackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from '../exceptions';

describe('HTTPClient', () => {
  const apiKey = 'test-api-key';
  const baseURL = 'https://api.tabstack.ai';

  beforeEach(() => {
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('constructor', () => {
    it('should create client with API key', () => {
      const client = new HTTPClient({ apiKey });
      expect(client).toBeInstanceOf(HTTPClient);
    });

    it('should use default base URL', () => {
      const client = new HTTPClient({ apiKey });
      expect(client).toBeDefined();
    });

    it('should accept custom base URL', () => {
      const customURL = 'https://custom.api.com';
      const client = new HTTPClient({ apiKey, baseURL: customURL });
      expect(client).toBeDefined();
    });

    it('should strip trailing slash from base URL', () => {
      const client = new HTTPClient({ apiKey, baseURL: 'https://api.example.com/' });
      expect(client).toBeDefined();
    });
  });

  describe('post()', () => {
    let client: HTTPClient;

    beforeEach(() => {
      client = new HTTPClient({ apiKey, baseURL });
    });

    it('should make successful POST request with JSON response', async () => {
      const responseData = { result: 'success', data: { id: 1 } };

      nock(baseURL).post('/test/endpoint').reply(200, responseData);

      const result = await client.post('/test/endpoint', { key: 'value' });
      expect(result).toEqual(responseData);
    });

    it('should send correct headers', async () => {
      nock(baseURL)
        .post('/test', (body) => {
          return body.key === 'value';
        })
        .matchHeader('authorization', `Bearer ${apiKey}`)
        .matchHeader('content-type', 'application/json')
        .matchHeader('accept', 'application/json')
        .matchHeader('user-agent', '@tabstack/sdk/1.0.0')
        .reply(200, { success: true });

      await client.post('/test', { key: 'value' });
    });

    it('should handle empty request body', async () => {
      nock(baseURL).post('/test').reply(200, { success: true });

      const result = await client.post('/test');
      expect(result).toEqual({ success: true });
    });

    it('should handle empty response body', async () => {
      nock(baseURL).post('/test').reply(200, '');

      const result = await client.post('/test', { key: 'value' });
      expect(result).toEqual({});
    });

    it('should throw BadRequestError on 400 status', async () => {
      nock(baseURL).post('/test').reply(400, { error: 'Invalid request' });

      await expect(client.post('/test')).rejects.toThrow(BadRequestError);
    });

    it('should throw UnauthorizedError on 401 status', async () => {
      nock(baseURL).post('/test').reply(401, { error: 'Invalid API key' });

      await expect(client.post('/test')).rejects.toThrow(UnauthorizedError);
    });

    it('should throw InvalidURLError on 422 status', async () => {
      nock(baseURL).post('/test').reply(422, { error: 'URL not accessible' });

      await expect(client.post('/test')).rejects.toThrow(InvalidURLError);
    });

    it('should throw ServerError on 500 status', async () => {
      nock(baseURL).post('/test').reply(500, { error: 'Internal error' });

      await expect(client.post('/test')).rejects.toThrow(ServerError);
    });

    it('should throw ServiceUnavailableError on 503 status', async () => {
      nock(baseURL).post('/test').reply(503, { error: 'Service not available' });

      await expect(client.post('/test')).rejects.toThrow(ServiceUnavailableError);
    });

    it('should throw APIError on other error status codes', async () => {
      nock(baseURL).post('/test').reply(418, { error: "I'm a teapot" });

      await expect(client.post('/test')).rejects.toThrow(APIError);
    });

    it('should handle error responses without JSON', async () => {
      nock(baseURL).post('/test').reply(400, 'Plain text error');

      await expect(client.post('/test')).rejects.toThrow(BadRequestError);
    });

    it('should handle error responses with empty body', async () => {
      nock(baseURL).post('/test').reply(500, '');

      await expect(client.post('/test')).rejects.toThrow(ServerError);
    });

    it('should throw TabstackError on malformed JSON response', async () => {
      nock(baseURL).post('/test').reply(200, 'invalid json{{{');

      await expect(client.post('/test')).rejects.toThrow(TabstackError);
    });

    it('should throw TabstackError on network error', async () => {
      nock(baseURL).post('/test').replyWithError('Network error');

      await expect(client.post('/test')).rejects.toThrow(TabstackError);
    });

    it('should handle query parameters in path', async () => {
      nock(baseURL).post('/test?param=value').reply(200, { success: true });

      const result = await client.post('/test?param=value', {});
      expect(result).toEqual({ success: true });
    });

    it('should work with HTTP (not HTTPS) protocol', async () => {
      const httpClient = new HTTPClient({ apiKey, baseURL: 'http://api.example.com' });

      nock('http://api.example.com').post('/test').reply(200, { success: true });

      const result = await httpClient.post('/test', {});
      expect(result).toEqual({ success: true });
    });
  });

  describe('postStream()', () => {
    let client: HTTPClient;

    beforeEach(() => {
      client = new HTTPClient({ apiKey, baseURL });
    });

    it('should stream Server-Sent Events', async () => {
      const sseData = [
        'event: message',
        'data: {"type":"event1"}',
        '',
        'event: message',
        'data: {"type":"event2"}',
        '',
      ].join('\n');

      nock(baseURL).post('/stream').reply(200, sseData, {
        'content-type': 'text/event-stream',
      });

      const events: string[] = [];
      for await (const line of client.postStream('/stream', { key: 'value' })) {
        events.push(line);
      }

      expect(events).toContain('event: message');
      expect(events).toContain('data: {"type":"event1"}');
      expect(events).toContain('data: {"type":"event2"}');
    });

    it('should handle streaming with CRLF line endings', async () => {
      const sseData = 'event: test\r\ndata: value\r\n\r\n';

      nock(baseURL).post('/stream').reply(200, sseData);

      const events: string[] = [];
      for await (const line of client.postStream('/stream')) {
        events.push(line);
      }

      expect(events).toContain('event: test');
      expect(events).toContain('data: value');
    });

    it('should yield remaining buffer data', async () => {
      const sseData = 'data: incomplete line';

      nock(baseURL).post('/stream').reply(200, sseData);

      const events: string[] = [];
      for await (const line of client.postStream('/stream')) {
        events.push(line);
      }

      expect(events).toContain('data: incomplete line');
    });

    it('should skip empty lines', async () => {
      const sseData = 'data: value1\n\n\ndata: value2\n';

      nock(baseURL).post('/stream').reply(200, sseData);

      const events: string[] = [];
      for await (const line of client.postStream('/stream')) {
        events.push(line);
      }

      expect(events).toEqual(['data: value1', 'data: value2']);
    });

    it('should send Accept: text/event-stream header', async () => {
      nock(baseURL)
        .post('/stream')
        .matchHeader('accept', 'text/event-stream')
        .reply(200, 'data: test\n');

      const events: string[] = [];
      for await (const line of client.postStream('/stream')) {
        events.push(line);
      }

      expect(events.length).toBeGreaterThan(0);
    });

    it('should throw UnauthorizedError on 401 status during stream', async () => {
      nock(baseURL).post('/stream').reply(401, { error: 'Unauthorized' });

      const generator = client.postStream('/stream');
      await expect(generator.next()).rejects.toThrow(UnauthorizedError);
    });

    it('should throw ServerError on 500 status during stream', async () => {
      nock(baseURL).post('/stream').reply(500, { error: 'Server error' });

      const generator = client.postStream('/stream');
      await expect(generator.next()).rejects.toThrow(ServerError);
    });

    it('should throw TabstackError on network error during stream', async () => {
      nock(baseURL).post('/stream').replyWithError('Connection failed');

      const generator = client.postStream('/stream');
      const error = await generator.next().catch((e) => e);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toContain('Request failed');
    });

    it('should handle multiline streaming data', async () => {
      const sseData = 'data: line1\ndata: line2\ndata: line3\n';

      nock(baseURL).post('/stream').reply(200, sseData);

      const events: string[] = [];
      for await (const line of client.postStream('/stream')) {
        events.push(line);
      }

      expect(events).toEqual(['data: line1', 'data: line2', 'data: line3']);
    });
  });

  describe('baseURL handling', () => {
    it('should strip trailing slash from custom base URL', async () => {
      const client = new HTTPClient({
        apiKey,
        baseURL: 'https://custom.api.com/',
      });

      nock('https://custom.api.com').post('/endpoint').reply(200, { success: true });

      const result = await client.post('/endpoint', {});
      expect(result).toEqual({ success: true });
    });

    it('should handle base URL without trailing slash', async () => {
      const client = new HTTPClient({
        apiKey,
        baseURL: 'https://custom.api.com',
      });

      nock('https://custom.api.com').post('/endpoint').reply(200, { success: true });

      const result = await client.post('/endpoint', {});
      expect(result).toEqual({ success: true });
    });
  });
});
