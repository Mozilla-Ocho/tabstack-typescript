/**
 * End-to-End tests for TABStack SDK
 *
 * These tests verify the complete SDK workflow from client initialization
 * through operator execution, testing the integration between all components.
 */

import nock from 'nock';
import { TABStack } from '../../src/client';
import { MarkdownResponse, JsonResponse, AutomateEvent } from '../../src/types';
import { BadRequestError, UnauthorizedError, InvalidURLError } from '../../src/exceptions';

describe('TABStack SDK E2E Tests', () => {
  const apiKey = 'test-api-key';
  const baseURL = 'https://api.tabstack.ai';
  let client: TABStack;

  beforeEach(() => {
    nock.cleanAll();
    client = new TABStack({ apiKey, baseURL });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('Complete Extract Workflow', () => {
    it('should extract markdown from URL end-to-end', async () => {
      const mockResponse = {
        url: 'https://example.com',
        content: '# Example Page\n\nThis is an example.',
        metadata: {
          title: 'Example Page',
          description: 'An example page',
          site_name: 'Example',
        },
      };

      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, mockResponse);

      const result = await client.extract.markdown('https://example.com', { metadata: true });

      expect(result).toBeInstanceOf(MarkdownResponse);
      expect(result.url).toBe('https://example.com');
      expect(result.content).toContain('# Example Page');
      expect(result.metadata?.title).toBe('Example Page');
      expect(result.metadata?.siteName).toBe('Example');
    });

    it('should generate schema and extract JSON end-to-end', async () => {
      const mockSchema = {
        type: 'object',
        properties: {
          stories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                points: { type: 'number' },
              },
            },
          },
        },
      };

      const mockData = {
        stories: [
          { title: 'Story 1', points: 100 },
          { title: 'Story 2', points: 50 },
        ],
      };

      nock(baseURL)
        .post('/v1/extract/json/schema')
        .reply(200, mockSchema);

      nock(baseURL)
        .post('/v1/extract/json')
        .reply(200, mockData);

      // First, generate the schema
      const schema = await client.extract.schema('https://news.example.com', {
        instructions: 'extract top stories',
      });

      expect(schema).toEqual(mockSchema);

      // Then use the schema to extract data
      const result = await client.extract.json<{ stories: Array<{ title: string; points: number }> }>(
        'https://news.example.com',
        schema
      );

      expect(result).toBeInstanceOf(JsonResponse);
      expect(result.data.stories).toHaveLength(2);
      expect(result.data.stories[0]?.title).toBe('Story 1');
    });
  });

  describe('Complete Generate Workflow', () => {
    it('should generate transformed content end-to-end', async () => {
      const schema = {
        type: 'object',
        properties: {
          summary: { type: 'string' },
          sentiment: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
        },
      };

      const mockResponse = {
        summary: 'This article discusses AI advancements',
        sentiment: 'positive',
        tags: ['AI', 'technology', 'innovation'],
      };

      nock(baseURL)
        .post('/v1/generate/json')
        .reply(200, mockResponse);

      const result = await client.generate.json<{
        summary: string;
        sentiment: string;
        tags: string[];
      }>('https://example.com/article', schema, 'Analyze and summarize the article');

      expect(result).toBeInstanceOf(JsonResponse);
      expect(result.data.summary).toBe('This article discusses AI advancements');
      expect(result.data.sentiment).toBe('positive');
      expect(result.data.tags).toContain('AI');
    });
  });

  describe('Complete Automate Workflow', () => {
    it('should stream automation events end-to-end', async () => {
      const sseData = [
        'event: start',
        'data: {"message":"Task started"}',
        '',
        'event: browser:navigated',
        'data: {"url":"https://github.com/trending","title":"Trending"}',
        '',
        'event: agent:extracted',
        'data: {"extractedData":{"repos":[]}}',
        '',
        'event: task:completed',
        'data: {"finalAnswer":"Extraction complete"}',
        '',
      ].join('\n');

      nock(baseURL)
        .post('/v1/automate')
        .reply(200, sseData, {
          'content-type': 'text/event-stream',
        });

      const events: AutomateEvent[] = [];
      for await (const event of client.automate.execute('Extract trending repos', {
        url: 'https://github.com/trending',
      })) {
        events.push(event);
      }

      expect(events).toHaveLength(4);
      expect(events[0]?.type).toBe('start');
      expect(events[1]?.type).toBe('browser:navigated');
      expect(events[2]?.type).toBe('agent:extracted');
      expect(events[3]?.type).toBe('task:completed');
      expect(events[3]?.data.get('finalAnswer')).toBe('Extraction complete');
    });
  });

  describe('Error Handling E2E', () => {
    it('should handle 401 unauthorized error', async () => {
      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(401, { error: 'Invalid API key' });

      await expect(client.extract.markdown('https://example.com')).rejects.toThrow(
        UnauthorizedError
      );
    });

    it('should handle 422 invalid URL error', async () => {
      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(422, { error: 'URL is not accessible' });

      await expect(client.extract.markdown('https://invalid-url.example')).rejects.toThrow(
        InvalidURLError
      );
    });

    it('should handle 400 bad request error', async () => {
      nock(baseURL)
        .post('/v1/generate/json')
        .reply(400, { error: 'Missing required field: instructions' });

      await expect(
        client.generate.json('https://example.com', {}, '')
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe('Multi-Operation Workflows', () => {
    it('should perform multiple operations in sequence', async () => {
      // Mock multiple endpoints
      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, {
          url: 'https://example.com',
          content: '# Page 1',
        });

      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, {
          url: 'https://example.com/page2',
          content: '# Page 2',
        });

      nock(baseURL)
        .post('/v1/generate/json')
        .reply(200, {
          combined: 'Summary of both pages',
        });

      // Extract from multiple pages
      const page1 = await client.extract.markdown('https://example.com');
      const page2 = await client.extract.markdown('https://example.com/page2');

      expect(page1.content).toBe('# Page 1');
      expect(page2.content).toBe('# Page 2');

      // Generate combined analysis
      const schema = {
        type: 'object',
        properties: { combined: { type: 'string' } },
      };

      const analysis = await client.generate.json<{ combined: string }>(
        'https://example.com',
        schema,
        'Summarize both pages'
      );

      expect(analysis.data.combined).toBe('Summary of both pages');
    });

    it('should handle nocache option across operations', async () => {
      // First request without nocache
      nock(baseURL)
        .post('/v1/extract/markdown', (body) => !body.nocache)
        .reply(200, { url: 'https://example.com', content: 'Cached' });

      // Second request with nocache
      nock(baseURL)
        .post('/v1/extract/markdown', (body) => body.nocache === true)
        .reply(200, { url: 'https://example.com', content: 'Fresh' });

      const cached = await client.extract.markdown('https://example.com');
      const fresh = await client.extract.markdown('https://example.com', { nocache: true });

      expect(cached.content).toBe('Cached');
      expect(fresh.content).toBe('Fresh');
    });
  });

  describe('Real-World Use Cases', () => {
    it('should scrape news articles with metadata', async () => {
      const mockResponse = {
        url: 'https://news.example.com/article',
        content: '# Breaking News\n\nArticle content here...',
        metadata: {
          title: 'Breaking News',
          author: 'Jane Doe',
          publisher: 'News Corp',
          image: 'https://news.example.com/image.jpg',
        },
      };

      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, mockResponse);

      const article = await client.extract.markdown('https://news.example.com/article', {
        metadata: true,
      });

      expect(article.metadata?.title).toBe('Breaking News');
      expect(article.metadata?.author).toBe('Jane Doe');
      expect(article.content).toContain('Article content here');
    });

    it('should extract product information', async () => {
      const schema = {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          inStock: { type: 'boolean' },
          features: { type: 'array', items: { type: 'string' } },
        },
      };

      const mockProduct = {
        name: 'Wireless Headphones',
        price: 299.99,
        inStock: true,
        features: ['Noise canceling', 'Bluetooth 5.0', '30-hour battery'],
      };

      nock(baseURL)
        .post('/v1/extract/json')
        .reply(200, mockProduct);

      const product = await client.extract.json<{
        name: string;
        price: number;
        inStock: boolean;
        features: string[];
      }>('https://shop.example.com/product/123', schema);

      expect(product.data.name).toBe('Wireless Headphones');
      expect(product.data.price).toBe(299.99);
      expect(product.data.inStock).toBe(true);
      expect(product.data.features).toHaveLength(3);
    });

    it('should perform sentiment analysis', async () => {
      const schema = {
        type: 'object',
        properties: {
          sentiment: { type: 'string' },
          confidence: { type: 'number' },
          keyPhrases: { type: 'array', items: { type: 'string' } },
        },
      };

      const mockAnalysis = {
        sentiment: 'positive',
        confidence: 0.92,
        keyPhrases: ['excellent product', 'highly recommend', 'great value'],
      };

      nock(baseURL)
        .post('/v1/generate/json')
        .reply(200, mockAnalysis);

      const result = await client.generate.json<{
        sentiment: string;
        confidence: number;
        keyPhrases: string[];
      }>('https://reviews.example.com/product/123', schema, 'Analyze sentiment and extract key phrases');

      expect(result.data.sentiment).toBe('positive');
      expect(result.data.confidence).toBeGreaterThan(0.9);
      expect(result.data.keyPhrases).toContain('excellent product');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', async () => {
      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, { url: 'https://example.com', content: '' });

      const result = await client.extract.markdown('https://example.com');

      expect(result.content).toBe('');
    });

    it('should handle large JSON responses', async () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        title: `Item ${i}`,
      }));

      nock(baseURL)
        .post('/v1/extract/json')
        .reply(200, { items: largeArray });

      const result = await client.extract.json<{ items: Array<{ id: number; title: string }> }>(
        'https://example.com',
        {
          type: 'object',
          properties: { items: { type: 'array' } },
        }
      );

      expect(result.data.items).toHaveLength(1000);
    });

    it('should handle special characters in URLs', async () => {
      const urlWithParams = 'https://example.com/search?q=test&page=1';

      nock(baseURL)
        .post('/v1/extract/markdown')
        .reply(200, { url: urlWithParams, content: 'Content' });

      const result = await client.extract.markdown(urlWithParams);

      expect(result.url).toBe(urlWithParams);
    });
  });
});
