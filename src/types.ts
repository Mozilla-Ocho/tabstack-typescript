/**
 * Type definitions and response models for Tabstack SDK
 */

/**
 * Metadata extracted from a web page
 */
export interface MetadataFields {
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  image?: string;
  siteName?: string;
  url?: string;
  type?: string;
}

export class Metadata {
  title?: string;
  description?: string;
  author?: string;
  publisher?: string;
  image?: string;
  siteName?: string;
  url?: string;
  type?: string;

  constructor(data: MetadataFields) {
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
    this.publisher = data.publisher;
    this.image = data.image;
    this.siteName = data.siteName;
    this.url = data.url;
    this.type = data.type;
  }

  static fromJSON(data: Record<string, unknown>): Metadata {
    return new Metadata({
      title: data.title as string | undefined,
      description: data.description as string | undefined,
      author: data.author as string | undefined,
      publisher: data.publisher as string | undefined,
      image: data.image as string | undefined,
      siteName: data.site_name as string | undefined,
      url: data.url as string | undefined,
      type: data.type as string | undefined,
    });
  }

  toJSON(): MetadataFields {
    const result: MetadataFields = {};
    if (this.title !== undefined) result.title = this.title;
    if (this.description !== undefined) result.description = this.description;
    if (this.author !== undefined) result.author = this.author;
    if (this.publisher !== undefined) result.publisher = this.publisher;
    if (this.image !== undefined) result.image = this.image;
    if (this.siteName !== undefined) result.siteName = this.siteName;
    if (this.url !== undefined) result.url = this.url;
    if (this.type !== undefined) result.type = this.type;
    return result;
  }
}

/**
 * Response from markdown extraction
 */
export class MarkdownResponse {
  constructor(
    public url: string,
    public content: string,
    public metadata?: Metadata
  ) {}

  static fromJSON(data: Record<string, unknown>): MarkdownResponse {
    const metadata =
      data.metadata && typeof data.metadata === 'object'
        ? Metadata.fromJSON(data.metadata as Record<string, unknown>)
        : undefined;

    return new MarkdownResponse(data.url as string, data.content as string, metadata);
  }
}

/**
 * Response from JSON extraction or generation
 */
export class JsonResponse<T = unknown> {
  constructor(public data: T) {}

  static fromJSON<T = unknown>(data: T): JsonResponse<T> {
    return new JsonResponse(data);
  }
}

/**
 * Event data with dynamic property access
 */
export class EventData {
  private raw: Record<string, unknown>;

  constructor(data: Record<string, unknown>) {
    this.raw = data;
  }

  /**
   * Get a property from the event data
   */
  get<T = unknown>(key: string, defaultValue?: T): T | undefined {
    return (this.raw[key] as T) ?? defaultValue;
  }

  /**
   * Get the raw event data
   */
  getRaw(): Record<string, unknown> {
    return this.raw;
  }
}

/**
 * Event from the automate streaming endpoint
 */
export class AutomateEvent {
  constructor(
    public type: string,
    public data: EventData
  ) {}

  static fromJSON(type: string, data: Record<string, unknown>): AutomateEvent {
    return new AutomateEvent(type, new EventData(data));
  }

  toString(): string {
    return `AutomateEvent(type='${this.type}', data=${JSON.stringify(this.data.getRaw())})`;
  }
}
