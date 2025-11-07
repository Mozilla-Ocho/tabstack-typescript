/**
 * Tests for Generate operator
 */

import { Generate } from './generate';
import { HTTPClient } from './util/http';
import { JsonResponse } from './types';

// Mock HTTPClient
jest.mock('./util/http');

describe('Generate', () => {
  let generate: Generate;
  let mockHttpClient: jest.Mocked<HTTPClient>;

  beforeEach(() => {
    mockHttpClient = new HTTPClient({ apiKey: 'test-key' }) as jest.Mocked<HTTPClient>;
    generate = new Generate(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('json', () => {
    const testSchema = {
      type: 'object',
      properties: {
        title: { type: 'string' },
        category: { type: 'string' },
        summary: { type: 'string' },
      },
      required: ['title', 'category', 'summary'],
    };

    const testInstructions = 'Categorize and summarize the content';

    it('should generate JSON data from URL', async () => {
      const mockData = {
        title: 'Test Article',
        category: 'technology',
        summary: 'A test article about tech',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json('https://example.com', testSchema, testInstructions);

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/generate/json', {
        url: 'https://example.com',
        json_schema: testSchema,
        instructions: testInstructions,
      });
      expect(result).toBeInstanceOf(JsonResponse);
      expect(result.data).toEqual(mockData);
    });

    it('should generate JSON with nocache option', async () => {
      const mockData = { fresh: true };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      await generate.json('https://example.com', testSchema, testInstructions, { nocache: true });

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/generate/json', {
        url: 'https://example.com',
        json_schema: testSchema,
        instructions: testInstructions,
        nocache: true,
      });
    });

    it('should handle array data generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          summaries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                summary: { type: 'string' },
              },
            },
          },
        },
      };

      const mockData = {
        summaries: [
          { title: 'Story 1', summary: 'Summary 1' },
          { title: 'Story 2', summary: 'Summary 2' },
        ],
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json(
        'https://example.com',
        schema,
        'Create summaries for each story'
      );

      expect(result.data).toEqual(mockData);
    });

    it('should handle complex nested data generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          analysis: {
            type: 'object',
            properties: {
              sentiment: { type: 'string' },
              topics: {
                type: 'array',
                items: { type: 'string' },
              },
              entities: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    type: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      };

      const mockData = {
        analysis: {
          sentiment: 'positive',
          topics: ['AI', 'Technology', 'Innovation'],
          entities: [
            { name: 'OpenAI', type: 'organization' },
            { name: 'GPT-4', type: 'product' },
          ],
        },
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json(
        'https://example.com',
        schema,
        'Analyze the content for sentiment, topics, and entities'
      );

      expect(result.data).toEqual(mockData);
    });

    it('should work with TypeScript generics', async () => {
      interface GeneratedContent {
        title: string;
        category: string;
        tags: string[];
        summary: string;
      }

      const mockData: GeneratedContent = {
        title: 'AI News',
        category: 'technology',
        tags: ['AI', 'ML', 'Innovation'],
        summary: 'Latest developments in AI technology',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json<GeneratedContent>(
        'https://example.com',
        testSchema,
        'Generate structured content'
      );

      expect(result.data.title).toBe('AI News');
      expect(result.data.category).toBe('technology');
      expect(result.data.tags).toEqual(['AI', 'ML', 'Innovation']);
      expect(result.data.summary).toBe('Latest developments in AI technology');
    });

    it('should handle simple text generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          summary: { type: 'string' },
        },
      };

      const mockData = {
        summary: 'This is a generated summary of the content.',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json('https://example.com', schema, 'Summarize the content');

      expect(result.data).toEqual(mockData);
    });

    it('should handle sentiment analysis generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          sentiment: { type: 'string' },
          confidence: { type: 'number' },
          reasoning: { type: 'string' },
        },
      };

      const mockData = {
        sentiment: 'positive',
        confidence: 0.87,
        reasoning: 'The article uses optimistic language and discusses benefits',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json(
        'https://example.com',
        schema,
        'Analyze sentiment with confidence score and reasoning'
      );

      expect(result.data).toEqual(mockData);
    });

    it('should handle categorization generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          categories: {
            type: 'array',
            items: { type: 'string' },
          },
          primaryCategory: { type: 'string' },
        },
      };

      const mockData = {
        categories: ['technology', 'business', 'innovation'],
        primaryCategory: 'technology',
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json(
        'https://example.com',
        schema,
        'Categorize the content and identify primary category'
      );

      expect(result.data).toEqual(mockData);
    });

    it('should handle key points extraction generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          keyPoints: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      };

      const mockData = {
        keyPoints: [
          'First important point from the article',
          'Second key takeaway',
          'Third major insight',
        ],
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json(
        'https://example.com',
        schema,
        'Extract the main key points'
      );

      expect(result.data).toEqual(mockData);
    });

    it('should handle long instructions', async () => {
      const longInstructions =
        'Analyze the content comprehensively. For each section, identify the main topic, ' +
        'extract key points, determine sentiment, categorize by subject area, and create ' +
        'a concise summary. Additionally, identify any mentioned entities such as people, ' +
        'organizations, or products, and classify them appropriately.';

      const mockData = {
        sections: [
          {
            topic: 'AI Development',
            keyPoints: ['Point 1', 'Point 2'],
            sentiment: 'positive',
            category: 'technology',
            summary: 'Summary text',
          },
        ],
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      await generate.json('https://example.com', testSchema, longInstructions);

      expect(mockHttpClient.post).toHaveBeenCalledWith('v1/generate/json', {
        url: 'https://example.com',
        json_schema: testSchema,
        instructions: longInstructions,
      });
    });

    it('should handle empty schema', async () => {
      const mockData = { result: 'data' };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json('https://example.com', {}, 'Generate content');

      expect(result.data).toEqual(mockData);
    });

    it('should handle null data', async () => {
      mockHttpClient.post = jest.fn().mockResolvedValue(null);

      const result = await generate.json('https://example.com', testSchema, testInstructions);

      expect(result.data).toBeNull();
    });

    it('should propagate errors from HTTP client', async () => {
      const error = new Error('Generation failed');
      mockHttpClient.post = jest.fn().mockRejectedValue(error);

      await expect(
        generate.json('https://example.com', testSchema, testInstructions)
      ).rejects.toThrow('Generation failed');
    });
  });

  describe('Integration scenarios', () => {
    it('should generate different analyses from same URL', async () => {
      const sentimentSchema = {
        type: 'object',
        properties: { sentiment: { type: 'string' } },
      };

      const summarySchema = {
        type: 'object',
        properties: { summary: { type: 'string' } },
      };

      mockHttpClient.post = jest
        .fn()
        .mockResolvedValueOnce({ sentiment: 'positive' })
        .mockResolvedValueOnce({ summary: 'A summary of the content' });

      const sentiment = await generate.json(
        'https://example.com',
        sentimentSchema,
        'Analyze sentiment'
      );

      const summary = await generate.json('https://example.com', summarySchema, 'Create summary');

      expect(sentiment.data).toEqual({ sentiment: 'positive' });
      expect(summary.data).toEqual({ summary: 'A summary of the content' });
    });

    it('should handle batch content generation', async () => {
      const schema = {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                category: { type: 'string' },
              },
            },
          },
        },
      };

      const mockData = {
        items: [
          { title: 'Item 1', category: 'tech' },
          { title: 'Item 2', category: 'business' },
          { title: 'Item 3', category: 'science' },
        ],
      };

      mockHttpClient.post = jest.fn().mockResolvedValue(mockData);

      const result = await generate.json<typeof mockData>(
        'https://example.com',
        schema,
        'Categorize all items on the page'
      );

      expect(result.data.items).toHaveLength(3);
      expect(result.data.items[0]?.category).toBe('tech');
    });

    it('should work with nocache for fresh generation', async () => {
      mockHttpClient.post = jest
        .fn()
        .mockResolvedValueOnce({ version: 'cached' })
        .mockResolvedValueOnce({ version: 'fresh' });

      const schema = { type: 'object', properties: { version: { type: 'string' } } };

      const cached = await generate.json('https://example.com', schema, 'Generate data');

      const fresh = await generate.json('https://example.com', schema, 'Generate data', {
        nocache: true,
      });

      expect(cached.data).toEqual({ version: 'cached' });
      expect(fresh.data).toEqual({ version: 'fresh' });
    });
  });
});
