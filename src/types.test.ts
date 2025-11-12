/**
 * Tests for Type classes
 */

import {
  Metadata,
  MetadataFields,
  MarkdownResponse,
  JsonResponse,
  EventData,
  AutomateEvent,
} from './types';

describe('Type Classes', () => {
  describe('Metadata', () => {
    const sampleMetadata: MetadataFields = {
      title: 'Test Page',
      description: 'A test page description',
      author: 'Test Author',
      publisher: 'Test Publisher',
      image: 'https://example.com/image.jpg',
      siteName: 'Test Site',
      url: 'https://example.com',
      type: 'article',
    };

    describe('constructor', () => {
      it('should create metadata with all fields', () => {
        const metadata = new Metadata(sampleMetadata);
        expect(metadata.title).toBe('Test Page');
        expect(metadata.description).toBe('A test page description');
        expect(metadata.author).toBe('Test Author');
        expect(metadata.publisher).toBe('Test Publisher');
        expect(metadata.image).toBe('https://example.com/image.jpg');
        expect(metadata.siteName).toBe('Test Site');
        expect(metadata.url).toBe('https://example.com');
        expect(metadata.type).toBe('article');
      });

      it('should create metadata with partial fields', () => {
        const metadata = new Metadata({ title: 'Only Title' });
        expect(metadata.title).toBe('Only Title');
        expect(metadata.description).toBeUndefined();
        expect(metadata.author).toBeUndefined();
      });

      it('should create metadata with empty object', () => {
        const metadata = new Metadata({});
        expect(metadata.title).toBeUndefined();
        expect(metadata.description).toBeUndefined();
      });
    });

    describe('fromJSON', () => {
      it('should create metadata from JSON object', () => {
        const json = {
          title: 'JSON Title',
          description: 'JSON Description',
          author: 'JSON Author',
          publisher: 'JSON Publisher',
          image: 'https://example.com/img.png',
          site_name: 'JSON Site',
          url: 'https://example.com/page',
          type: 'website',
        };

        const metadata = Metadata.fromJSON(json);
        expect(metadata.title).toBe('JSON Title');
        expect(metadata.description).toBe('JSON Description');
        expect(metadata.author).toBe('JSON Author');
        expect(metadata.publisher).toBe('JSON Publisher');
        expect(metadata.image).toBe('https://example.com/img.png');
        expect(metadata.siteName).toBe('JSON Site');
        expect(metadata.url).toBe('https://example.com/page');
        expect(metadata.type).toBe('website');
      });

      it('should handle snake_case to camelCase conversion', () => {
        const json = { site_name: 'Test Site' };
        const metadata = Metadata.fromJSON(json);
        expect(metadata.siteName).toBe('Test Site');
      });

      it('should handle missing fields', () => {
        const json = { title: 'Only Title' };
        const metadata = Metadata.fromJSON(json);
        expect(metadata.title).toBe('Only Title');
        expect(metadata.description).toBeUndefined();
      });

      it('should handle empty object', () => {
        const metadata = Metadata.fromJSON({});
        expect(metadata.title).toBeUndefined();
      });
    });

    describe('toJSON', () => {
      it('should convert metadata to JSON object', () => {
        const metadata = new Metadata(sampleMetadata);
        const json = metadata.toJSON();
        expect(json).toEqual(sampleMetadata);
      });

      it('should exclude undefined fields', () => {
        const metadata = new Metadata({ title: 'Only Title' });
        const json = metadata.toJSON();
        expect(json).toEqual({ title: 'Only Title' });
        expect('description' in json).toBe(false);
        expect('author' in json).toBe(false);
      });

      it('should return empty object for empty metadata', () => {
        const metadata = new Metadata({});
        const json = metadata.toJSON();
        expect(json).toEqual({});
      });
    });

    describe('round-trip conversion', () => {
      it('should preserve data through JSON serialization', () => {
        const original = new Metadata(sampleMetadata);
        const json = original.toJSON();
        const restored = new Metadata(json);
        expect(restored.toJSON()).toEqual(original.toJSON());
      });
    });
  });

  describe('MarkdownResponse', () => {
    describe('constructor', () => {
      it('should create response with url and content', () => {
        const response = new MarkdownResponse('https://example.com', '# Heading\n\nContent');
        expect(response.url).toBe('https://example.com');
        expect(response.content).toBe('# Heading\n\nContent');
        expect(response.metadata).toBeUndefined();
      });

      it('should create response with metadata', () => {
        const metadata = new Metadata({ title: 'Test' });
        const response = new MarkdownResponse('https://example.com', 'Content', metadata);
        expect(response.metadata).toBe(metadata);
        expect(response.metadata?.title).toBe('Test');
      });
    });

    describe('fromJSON', () => {
      it('should create response from JSON without metadata', () => {
        const json = {
          url: 'https://example.com',
          content: '# Title\n\nParagraph',
        };

        const response = MarkdownResponse.fromJSON(json);
        expect(response.url).toBe('https://example.com');
        expect(response.content).toBe('# Title\n\nParagraph');
        expect(response.metadata).toBeUndefined();
      });

      it('should create response from JSON with metadata', () => {
        const json = {
          url: 'https://example.com',
          content: '# Title',
          metadata: {
            title: 'Page Title',
            description: 'Page Description',
          },
        };

        const response = MarkdownResponse.fromJSON(json);
        expect(response.url).toBe('https://example.com');
        expect(response.content).toBe('# Title');
        expect(response.metadata).toBeInstanceOf(Metadata);
        expect(response.metadata?.title).toBe('Page Title');
        expect(response.metadata?.description).toBe('Page Description');
      });

      it('should handle empty content', () => {
        const json = {
          url: 'https://example.com',
          content: '',
        };

        const response = MarkdownResponse.fromJSON(json);
        expect(response.content).toBe('');
      });

      it('should handle metadata as non-object', () => {
        const json = {
          url: 'https://example.com',
          content: 'Content',
          metadata: 'invalid',
        };

        const response = MarkdownResponse.fromJSON(json);
        expect(response.metadata).toBeUndefined();
      });
    });
  });

  describe('JsonResponse', () => {
    describe('constructor', () => {
      it('should create response with data', () => {
        const data = { key: 'value', nested: { prop: 123 } };
        const response = new JsonResponse(data);
        expect(response.data).toBe(data);
        expect(response.data).toEqual({ key: 'value', nested: { prop: 123 } });
      });

      it('should create response with array data', () => {
        const data = [1, 2, 3, 4, 5];
        const response = new JsonResponse(data);
        expect(response.data).toEqual([1, 2, 3, 4, 5]);
      });

      it('should create response with primitive data', () => {
        const response = new JsonResponse('string value');
        expect(response.data).toBe('string value');
      });

      it('should create response with null', () => {
        const response = new JsonResponse(null);
        expect(response.data).toBeNull();
      });
    });

    describe('fromJSON', () => {
      it('should create response from object', () => {
        const data = { name: 'Test', value: 42 };
        const response = JsonResponse.fromJSON(data);
        expect(response).toBeInstanceOf(JsonResponse);
        expect(response.data).toEqual({ name: 'Test', value: 42 });
      });

      it('should create response from array', () => {
        const data = ['a', 'b', 'c'];
        const response = JsonResponse.fromJSON(data);
        expect(response.data).toEqual(['a', 'b', 'c']);
      });

      it('should create response with generic type', () => {
        interface CustomType {
          id: number;
          name: string;
        }

        const data: CustomType = { id: 1, name: 'Test' };
        const response = JsonResponse.fromJSON<CustomType>(data);
        expect(response.data.id).toBe(1);
        expect(response.data.name).toBe('Test');
      });

      it('should handle nested objects', () => {
        const data = {
          user: {
            profile: {
              name: 'John',
              age: 30,
            },
          },
        };

        const response = JsonResponse.fromJSON(data);
        expect(response.data).toEqual(data);
      });
    });
  });

  describe('EventData', () => {
    describe('constructor', () => {
      it('should create event data with raw data', () => {
        const raw = { key: 'value', number: 42 };
        const eventData = new EventData(raw);
        expect(eventData).toBeInstanceOf(EventData);
      });
    });

    describe('get', () => {
      it('should get property by key', () => {
        const eventData = new EventData({ name: 'Test', value: 123 });
        expect(eventData.get('name')).toBe('Test');
        expect(eventData.get('value')).toBe(123);
      });

      it('should return undefined for missing key', () => {
        const eventData = new EventData({ key: 'value' });
        expect(eventData.get('missing')).toBeUndefined();
      });

      it('should return default value for missing key', () => {
        const eventData = new EventData({ key: 'value' });
        expect(eventData.get('missing', 'default')).toBe('default');
      });

      it('should handle nested objects', () => {
        const eventData = new EventData({
          nested: { prop: 'value' },
        });
        const nested = eventData.get('nested') as Record<string, string>;
        expect(nested.prop).toBe('value');
      });

      it('should handle arrays', () => {
        const eventData = new EventData({ items: [1, 2, 3] });
        expect(eventData.get('items')).toEqual([1, 2, 3]);
      });

      it('should use generic type parameter', () => {
        const eventData = new EventData({ count: 42 });
        const count = eventData.get<number>('count');
        expect(count).toBe(42);
      });

      it('should handle null values', () => {
        const eventData = new EventData({ nullable: null });
        // Note: nullish coalescing (??) treats null as falsy, so it returns undefined
        expect(eventData.get('nullable')).toBeUndefined();
      });

      it('should prefer actual value over default', () => {
        const eventData = new EventData({ key: 'actual' });
        expect(eventData.get('key', 'default')).toBe('actual');
      });
    });

    describe('getRaw', () => {
      it('should return raw data object', () => {
        const raw = { key: 'value', num: 123, nested: { prop: true } };
        const eventData = new EventData(raw);
        expect(eventData.getRaw()).toEqual(raw);
      });

      it('should return reference to original object', () => {
        const raw = { mutable: 'original' };
        const eventData = new EventData(raw);
        const retrieved = eventData.getRaw();
        retrieved.mutable = 'modified';
        expect(eventData.getRaw().mutable).toBe('modified');
      });
    });
  });

  describe('AutomateEvent', () => {
    describe('constructor', () => {
      it('should create event with type and data', () => {
        const eventData = new EventData({ message: 'test' });
        const event = new AutomateEvent('action', eventData);
        expect(event.type).toBe('action');
        expect(event.data).toBe(eventData);
      });
    });

    describe('fromJSON', () => {
      it('should create event from type and data', () => {
        const event = AutomateEvent.fromJSON('navigate', { url: 'https://example.com' });
        expect(event).toBeInstanceOf(AutomateEvent);
        expect(event.type).toBe('navigate');
        expect(event.data).toBeInstanceOf(EventData);
        expect(event.data.get('url')).toBe('https://example.com');
      });

      it('should handle empty data', () => {
        const event = AutomateEvent.fromJSON('complete', {});
        expect(event.type).toBe('complete');
        expect(event.data.getRaw()).toEqual({});
      });

      it('should handle complex data', () => {
        const data = {
          action: 'click',
          element: { id: 'button1', text: 'Submit' },
          timestamp: 1234567890,
        };

        const event = AutomateEvent.fromJSON('interaction', data);
        expect(event.data.get('action')).toBe('click');
        expect(event.data.get('timestamp')).toBe(1234567890);
      });
    });

    describe('toString', () => {
      it('should format event as string', () => {
        const event = AutomateEvent.fromJSON('test', { key: 'value' });
        const str = event.toString();
        expect(str).toContain("type='test'");
        expect(str).toContain('key');
        expect(str).toContain('value');
      });

      it('should include all data in string representation', () => {
        const event = AutomateEvent.fromJSON('action', {
          id: 1,
          name: 'Test',
          active: true,
        });

        const str = event.toString();
        expect(str).toContain("type='action'");
        expect(str).toContain('"id":1');
        expect(str).toContain('"name":"Test"');
        expect(str).toContain('"active":true');
      });

      it('should handle empty data', () => {
        const event = AutomateEvent.fromJSON('empty', {});
        const str = event.toString();
        expect(str).toBe("AutomateEvent(type='empty', data={})");
      });
    });
  });

  describe('Type Integration', () => {
    it('should work together in typical SDK usage', () => {
      // Simulate markdown extraction response
      const markdownJson = {
        url: 'https://example.com',
        content: '# Title\n\nContent',
        metadata: {
          title: 'Example Page',
          site_name: 'Example',
        },
      };

      const markdownResponse = MarkdownResponse.fromJSON(markdownJson);
      expect(markdownResponse.metadata?.siteName).toBe('Example');

      // Simulate JSON extraction response
      const jsonData = { products: [{ id: 1, name: 'Product 1' }] };
      const jsonResponse = JsonResponse.fromJSON(jsonData);
      expect(jsonResponse.data).toEqual(jsonData);

      // Simulate automation event
      const event = AutomateEvent.fromJSON('complete', { success: true });
      expect(event.data.get('success')).toBe(true);
    });
  });
});
