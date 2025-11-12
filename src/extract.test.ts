/**
 * Tests for Extract operator
 */

import { Extract } from './extract';
import { HTTPClient } from './util/http';
import { MarkdownResponse, JsonResponse, Metadata } from './types';

// Mock HTTPClient
jest.mock('./util/http');

describe('Extract', () => {
  let extract: Extract;
  let mockHttpClient: jest.Mocked<HTTPClient>;

  beforeEach(() => {
    mockHttpClient = new HTTPClient({ apiKey: 'test-key' }) as jest.Mocked<HTTPClient>;
    extract = new Extract(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('markdown', () => {
    it('should extract markdown from URL', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: '# Test Page\n\nContent here',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await extract.markdown('https://example.com');

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/markdown', {
        url: 'https://example.com',
      });
      expect(result).toBeInstanceOf(MarkdownResponse);
      expect(result.url).toBe('https://example.com');
      expect(result.content).toBe('# Test Page\n\nContent here');
    });

    it('should extract markdown with metadata option', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: '# Test Page\n\nContent',
        metadata: {
          title: 'Test Page',
          description: 'A test page',
          site_name: 'Example Site',
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await extract.markdown('https://example.com', { metadata: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/markdown', {
        url: 'https://example.com',
        metadata: true,
      });
      expect(result.metadata).toBeInstanceOf(Metadata);
      expect(result.metadata?.title).toBe('Test Page');
      expect(result.metadata?.siteName).toBe('Example Site');
    });

    it('should extract markdown with nocache option', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: 'Fresh content',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      await extract.markdown('https://example.com', { nocache: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/markdown', {
        url: 'https://example.com',
        nocache: true,
      });
    });

    it('should extract markdown with both metadata and nocache options', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: 'Content',
        metadata: { title: 'Test' },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      await extract.markdown('https://example.com', { metadata: true, nocache: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/markdown', {
        url: 'https://example.com',
        metadata: true,
        nocache: true,
      });
    });

    it('should handle empty content', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: '',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await extract.markdown('https://example.com');

      expect(result.content).toBe('');
    });

    it('should handle markdown without metadata', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: '# Title',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockResponse);

      const result = await extract.markdown('https://example.com', { metadata: false });

      expect(result.metadata).toBeUndefined();
    });

    it('should propagate errors from HTTP client', async () => {
      const error = new Error('Network error');
      mockHttpClient.post = jest.fn().mockRejectedValue(error);

      await expect(extract.markdown('https://example.com')).rejects.toThrow('Network error');
    });
  });

  describe('schema', () => {
    it('should generate schema from URL', async () => {
      const mockSchema = {
        type: 'object',
        properties: {
          title: { type: 'string' },
          items: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockSchema);

      const result = await extract.schema('https://example.com');

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json/schema', {
        url: 'https://example.com',
      });
      expect(result).toEqual(mockSchema);
    });

    it('should generate schema with instructions', async () => {
      const mockSchema = {
        type: 'object',
        properties: {
          stories: { type: 'array' },
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockSchema);

      await extract.schema('https://example.com', {
        instructions: 'extract top stories with title and author',
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json/schema', {
        url: 'https://example.com',
        instructions: 'extract top stories with title and author',
      });
    });

    it('should generate schema with nocache option', async () => {
      const mockSchema = { type: 'object' };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockSchema);

      await extract.schema('https://example.com', { nocache: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json/schema', {
        url: 'https://example.com',
        nocache: true,
      });
    });

    it('should generate schema with both instructions and nocache', async () => {
      const mockSchema = { type: 'object' };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockSchema);

      await extract.schema('https://example.com', {
        instructions: 'extract products',
        nocache: true,
      });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json/schema', {
        url: 'https://example.com',
        instructions: 'extract products',
        nocache: true,
      });
    });

    it('should handle complex nested schemas', async () => {
      const mockSchema = {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    value: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockSchema);

      const result = await extract.schema('https://example.com');

      expect(result).toEqual(mockSchema);
    });

    it('should propagate errors from HTTP client', async () => {
      const error = new Error('Schema generation failed');
      mockHttpClient.post = jest.fn().mockRejectedValue(error);

      await expect(extract.schema('https://example.com')).rejects.toThrow(
        'Schema generation failed'
      );
    });
  });

  describe('json', () => {
    const testSchema = {
      type: 'object',
      properties: {
        title: { type: 'string' },
        count: { type: 'number' },
      },
    };

    it('should extract JSON data from URL', async () => {
      const mockData = {
        title: 'Test Article',
        count: 42,
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await extract.json('https://example.com', testSchema);

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json', {
        url: 'https://example.com',
        json_schema: testSchema,
      });
      expect(result).toBeInstanceOf(JsonResponse);
      expect(result.data).toEqual(mockData);
    });

    it('should extract JSON with nocache option', async () => {
      const mockData = { fresh: true };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      await extract.json('https://example.com', testSchema, { nocache: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json', {
        url: 'https://example.com',
        json_schema: testSchema,
        nocache: true,
      });
    });

    it('should handle array data', async () => {
      const schema = {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
      };

      const mockData = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await extract.json('https://example.com', schema);

      expect(result.data).toEqual(mockData);
    });

    it('should handle nested object data', async () => {
      const schema = {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              profile: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  age: { type: 'number' },
                },
              },
            },
          },
        },
      };

      const mockData = {
        user: {
          profile: {
            name: 'John Doe',
            age: 30,
          },
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await extract.json('https://example.com', schema);

      expect(result.data).toEqual(mockData);
    });

    it('should work with TypeScript generics', async () => {
      interface Product {
        name: string;
        price: number;
        inStock: boolean;
      }

      const mockData: Product = {
        name: 'Headphones',
        price: 299.99,
        inStock: true,
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await extract.json<Product>('https://example.com', testSchema);

      expect(result.data.name).toBe('Headphones');
      expect(result.data.price).toBe(299.99);
      expect(result.data.inStock).toBe(true);
    });

    it('should handle empty schema', async () => {
      const mockData = { value: 'test' };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await extract.json('https://example.com', {});

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/extract/json', {
        url: 'https://example.com',
        json_schema: {},
      });
      expect(result.data).toEqual(mockData);
    });

    it('should handle null data', async () => {
      mockHttpClient.post = jest.fn().mockResolvedValue(null);

      const result = await extract.json('https://example.com', testSchema);

      expect(result.data).toBeNull();
    });

    it('should propagate errors from HTTP client', async () => {
      const error = new Error('Extraction failed');
      mockHttpClient.post = jest.fn().mockRejectedValue(error);

      await expect(extract.json('https://example.com', testSchema)).rejects.toThrow(
        'Extraction failed'
      );
    });
  });

  describe('Integration scenarios', () => {
    it('should use generated schema for extraction', async () => {
      const mockSchema = {
        type: 'object',
        properties: {
          stories: { type: 'array' },
        },
      };

      const mockData = {
        stories: [
          { title: 'Story 1', points: 100 },
          { title: 'Story 2', points: 50 },
        ],
      };

      mockHttpClient.post = jest
        .fn()
        .mockResolvedValueOnce(mockSchema)
        .mockResolvedValueOnce(mockData);

      // First generate schema
      const schema = await extract.schema('https://example.com', {
        instructions: 'extract top stories',
      });

      // Then use it for extraction
      const result = await extract.json('https://example.com', schema);

      expect(mockHttpClient.post).toHaveBeenCalledTimes(2);
      expect(result.data).toEqual(mockData);
    });

    it('should handle multiple extractions with same schema', async () => {
      const schema = { type: 'object', properties: { value: { type: 'string' } } };

      mockHttpClient.post = jest
        .fn()
        .mockResolvedValueOnce({ value: 'first' })
        .mockResolvedValueOnce({ value: 'second' });

      const result1 = await extract.json('https://example.com/page1', schema);
      const result2 = await extract.json('https://example.com/page2', schema);

      expect(result1.data).toEqual({ value: 'first' });
      expect(result2.data).toEqual({ value: 'second' });
    });

    it('should extract markdown and JSON from same URL', async () => {
      mockHttpClient.post = jest
        .fn()
        .mockResolvedValueOnce({
          url: 'https://example.com',
          content: '# Title',
        })
        .mockResolvedValueOnce({ title: 'Title', content: 'Content' });

      const markdownResult = await extract.markdown('https://example.com');
      const jsonResult = await extract.json('https://example.com', {
        type: 'object',
        properties: { title: { type: 'string' } },
      });

      expect(markdownResult.content).toBe('# Title');
      expect(jsonResult.data).toEqual({ title: 'Title', content: 'Content' });
    });
  });
});
