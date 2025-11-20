/**
 * Tests for TABStack Client
 */

import { TABStack } from './client';
import { Extract } from './extract';
import { Generate } from './generate';
import { Agent } from './agent';
import { HTTPClient } from './util/http';

// Mock dependencies
jest.mock('./util/http');
jest.mock('./extract');
jest.mock('./generate');
jest.mock('./agent');

describe('TABStack Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create client with valid API key', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      expect(client).toBeInstanceOf(TABStack);
      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseURL: undefined,
      });
    });

    it('should create client with API key and custom baseURL', () => {
      const client = new TABStack({
        apiKey: 'test-api-key',
        baseURL: 'https://custom.api.com',
      });

      expect(client).toBeInstanceOf(TABStack);
      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseURL: 'https://custom.api.com',
      });
    });

    it('should throw error when API key is missing', () => {
      expect(() => {
        // @ts-expect-error Testing missing apiKey
        new TABStack({});
      }).toThrow('apiKey is required');
    });

    it('should throw error when API key is empty string', () => {
      expect(() => {
        new TABStack({ apiKey: '' });
      }).toThrow('apiKey is required');
    });

    it('should throw error when API key is null', () => {
      expect(() => {
        // @ts-expect-error Testing null apiKey
        new TABStack({ apiKey: null });
      }).toThrow('apiKey is required');
    });

    it('should throw error when API key is undefined', () => {
      expect(() => {
        // @ts-expect-error Testing undefined apiKey
        new TABStack({ apiKey: undefined });
      }).toThrow('apiKey is required');
    });

    it('should initialize all operators', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      expect(client.extract).toBeInstanceOf(Extract);
      expect(client.generate).toBeInstanceOf(Generate);
      expect(client.agent).toBeInstanceOf(Agent);
    });

    it('should pass HTTPClient to all operators', () => {
      void new TABStack({ apiKey: 'test-api-key' });

      expect(Extract).toHaveBeenCalledTimes(1);
      expect(Generate).toHaveBeenCalledTimes(1);
      expect(Agent).toHaveBeenCalledTimes(1);

      // Verify they were called with the HTTPClient instance
      const httpClientInstance = (HTTPClient as jest.MockedClass<typeof HTTPClient>).mock
        .instances[0];
      expect(Extract).toHaveBeenCalledWith(httpClientInstance);
      expect(Generate).toHaveBeenCalledWith(httpClientInstance);
      expect(Agent).toHaveBeenCalledWith(httpClientInstance);
    });
  });

  describe('operators', () => {
    it('should have extract operator', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      expect(client.extract).toBeDefined();
      expect(client.extract).toBeInstanceOf(Extract);
    });

    it('should have generate operator', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      expect(client.generate).toBeDefined();
      expect(client.generate).toBeInstanceOf(Generate);
    });

    it('should have agent client', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      expect(client.agent).toBeDefined();
      expect(client.agent).toBeInstanceOf(Agent);
    });

    it('should have readonly operators', () => {
      const client = new TABStack({ apiKey: 'test-api-key' });

      // TypeScript ensures readonly, but we can verify they exist
      expect(Object.getOwnPropertyDescriptor(client, 'extract')).toBeDefined();
      expect(Object.getOwnPropertyDescriptor(client, 'generate')).toBeDefined();
      expect(Object.getOwnPropertyDescriptor(client, 'agent')).toBeDefined();
    });
  });

  describe('multiple instances', () => {
    it('should create independent client instances', () => {
      const client1 = new TABStack({ apiKey: 'key1' });
      const client2 = new TABStack({ apiKey: 'key2' });

      expect(client1).not.toBe(client2);
      expect(HTTPClient).toHaveBeenCalledTimes(2);
      expect(HTTPClient).toHaveBeenNthCalledWith(1, {
        apiKey: 'key1',
        baseURL: undefined,
      });
      expect(HTTPClient).toHaveBeenNthCalledWith(2, {
        apiKey: 'key2',
        baseURL: undefined,
      });
    });

    it('should create clients with different baseURLs', () => {
      void new TABStack({
        apiKey: 'key1',
        baseURL: 'https://api1.example.com',
      });
      void new TABStack({
        apiKey: 'key2',
        baseURL: 'https://api2.example.com',
      });

      expect(HTTPClient).toHaveBeenCalledTimes(2);
      expect(HTTPClient).toHaveBeenNthCalledWith(1, {
        apiKey: 'key1',
        baseURL: 'https://api1.example.com',
      });
      expect(HTTPClient).toHaveBeenNthCalledWith(2, {
        apiKey: 'key2',
        baseURL: 'https://api2.example.com',
      });
    });
  });

  describe('API key validation', () => {
    it('should accept valid string API keys', () => {
      const validKeys = [
        'abc123',
        'TABS_1234567890',
        'sk-proj-1234567890abcdef',
        'my-api-key-with-dashes',
        'my_api_key_with_underscores',
      ];

      validKeys.forEach((key) => {
        expect(() => new TABStack({ apiKey: key })).not.toThrow();
      });
    });

    it('should reject non-string API keys', () => {
      const invalidKeys = [123, true, {}, []];

      invalidKeys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(() => new TABStack({ apiKey: key as any })).toThrow('apiKey is required');
      });
    });

    it('should handle whitespace-only API keys', () => {
      expect(() => new TABStack({ apiKey: '   ' })).not.toThrow();
      // Note: The client doesn't trim whitespace, so this technically passes
      // The actual validation happens at the API level
    });
  });

  describe('configuration', () => {
    it('should handle default configuration', () => {
      void new TABStack({ apiKey: 'test-key' });

      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        baseURL: undefined,
      });
    });

    it('should handle custom baseURL with trailing slash', () => {
      void new TABStack({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com/',
      });

      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com/',
      });
    });

    it('should handle custom baseURL without trailing slash', () => {
      void new TABStack({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com',
      });

      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        baseURL: 'https://custom.api.com',
      });
    });

    it('should handle localhost baseURL', () => {
      void new TABStack({
        apiKey: 'test-key',
        baseURL: 'http://localhost:8080',
      });

      expect(HTTPClient).toHaveBeenCalledWith({
        apiKey: 'test-key',
        baseURL: 'http://localhost:8080',
      });
    });
  });

  describe('type safety', () => {
    it('should enforce TABStackOptions interface', () => {
      // This test ensures TypeScript types are working correctly
      const options = {
        apiKey: 'test-key',
        baseURL: 'https://api.example.com',
      };

      const client = new TABStack(options);
      expect(client).toBeInstanceOf(TABStack);
    });

    it('should allow optional baseURL', () => {
      const options = { apiKey: 'test-key' };
      const client = new TABStack(options);
      expect(client).toBeInstanceOf(TABStack);
    });
  });

  describe('integration', () => {
    it('should allow chaining operator methods', () => {
      const client = new TABStack({ apiKey: 'test-key' });

      // Verify operators exist and can be accessed
      expect(client.extract.markdown).toBeDefined();
      expect(client.extract.json).toBeDefined();
      expect(client.generate.json).toBeDefined();
      expect(client.agent.automate).toBeDefined();
    });

    it('should maintain separate operator instances per client', () => {
      const client1 = new TABStack({ apiKey: 'key1' });
      const client2 = new TABStack({ apiKey: 'key2' });

      expect(client1.extract).not.toBe(client2.extract);
      expect(client1.generate).not.toBe(client2.generate);
      expect(client1.agent).not.toBe(client2.agent);
    });
  });

  describe('error handling', () => {
    it('should throw descriptive error for missing apiKey', () => {
      expect(() => {
        // @ts-expect-error Testing missing apiKey
        new TABStack({});
      }).toThrow('apiKey is required');
    });

    it('should throw error immediately on construction, not on first use', () => {
      // @ts-expect-error Testing missing apiKey
      expect(() => new TABStack({})).toThrow();

      // Should not throw if apiKey is provided
      const client = new TABStack({ apiKey: 'test-key' });
      expect(client).toBeInstanceOf(TABStack);
    });
  });
});
