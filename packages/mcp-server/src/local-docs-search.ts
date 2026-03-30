// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'automate',
    endpoint: '/automate',
    httpMethod: 'post',
    summary: 'AI Task',
    description:
      "Execute AI-powered browser automation tasks using natural language with optional geotargeting. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates and results as they're generated\n\n**Geotargeting:**\n- Optionally specify a country code for geotargeted browsing\n\n**Use Cases:**\n- Web scraping and data extraction\n- Form filling and interaction\n- Navigation and information gathering\n- Multi-step web workflows\n- Content analysis from web pages",
    stainlessPath: '(resource) agent > (method) automate',
    qualified: 'client.agent.automate',
    params: [
      'task: string;',
      'data?: object;',
      'geo_target?: { country?: string; };',
      'guardrails?: string;',
      'maxIterations?: number;',
      'maxValidationAttempts?: number;',
      'url?: string;',
    ],
    response: '{ data?: object; event?: string; }',
    markdown:
      '## automate\n\n`client.agent.automate(task: string, data?: object, geo_target?: { country?: string; }, guardrails?: string, maxIterations?: number, maxValidationAttempts?: number, url?: string): { data?: object; event?: string; }`\n\n**post** `/automate`\n\nExecute AI-powered browser automation tasks using natural language with optional geotargeting. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates and results as they\'re generated\n\n**Geotargeting:**\n- Optionally specify a country code for geotargeted browsing\n\n**Use Cases:**\n- Web scraping and data extraction\n- Form filling and interaction\n- Navigation and information gathering\n- Multi-step web workflows\n- Content analysis from web pages\n\n### Parameters\n\n- `task: string`\n  The task description in natural language\n\n- `data?: object`\n  JSON data to provide context for form filling or complex tasks\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., "US", "GB", "JP").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `guardrails?: string`\n  Safety constraints for execution\n\n- `maxIterations?: number`\n  Maximum task iterations\n\n- `maxValidationAttempts?: number`\n  Maximum validation attempts\n\n- `url?: string`\n  Starting URL for the task\n\n### Returns\n\n- `{ data?: object; event?: string; }`\n\n  - `data?: object`\n  - `event?: string`\n\n### Example\n\n```typescript\nimport Tabstack from \'@tabstack/sdk\';\n\nconst client = new Tabstack();\n\nconst stream = await client.agent.automate({ task: \'Find the top 3 trending repositories and extract their names, descriptions, and star counts\' });\nfor await (const automateEvent of stream) {\n  console.log(automateEvent);\n}\n```',
  },
  {
    name: 'research',
    endpoint: '/research',
    httpMethod: 'post',
    summary: 'Research',
    description:
      'Execute AI-powered research queries that search the web, analyze sources, and synthesize comprehensive answers. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates as research progresses through phases\n\n**Research Modes:**\n- `fast` - Quick answers with minimal web searches\n- `balanced` - Standard research with multiple iterations (default)\n\n**Use Cases:**\n- Answering complex questions with cited sources\n- Synthesizing information from multiple web sources\n- Research reports on specific topics\n- Fact-checking and verification tasks',
    stainlessPath: '(resource) agent > (method) research',
    qualified: 'client.agent.research',
    params: [
      'query: string;',
      'fetch_timeout?: number;',
      "mode?: 'fast' | 'balanced';",
      'nocache?: boolean;',
    ],
    response: "{ data?: object; event?: 'phase' | 'progress' | 'complete' | 'error'; }",
    markdown:
      "## research\n\n`client.agent.research(query: string, fetch_timeout?: number, mode?: 'fast' | 'balanced', nocache?: boolean): { data?: object; event?: 'phase' | 'progress' | 'complete' | 'error'; }`\n\n**post** `/research`\n\nExecute AI-powered research queries that search the web, analyze sources, and synthesize comprehensive answers. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates as research progresses through phases\n\n**Research Modes:**\n- `fast` - Quick answers with minimal web searches\n- `balanced` - Standard research with multiple iterations (default)\n\n**Use Cases:**\n- Answering complex questions with cited sources\n- Synthesizing information from multiple web sources\n- Research reports on specific topics\n- Fact-checking and verification tasks\n\n### Parameters\n\n- `query: string`\n  The research query or question to answer\n\n- `fetch_timeout?: number`\n  Timeout in seconds for fetching web pages\n\n- `mode?: 'fast' | 'balanced'`\n  Research mode: fast (quick answers), balanced (standard research, default)\n\n- `nocache?: boolean`\n  Skip cache and force fresh research\n\n### Returns\n\n- `{ data?: object; event?: 'phase' | 'progress' | 'complete' | 'error'; }`\n\n  - `data?: object`\n  - `event?: 'phase' | 'progress' | 'complete' | 'error'`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst stream = await client.agent.research({ query: 'What are the latest developments in quantum computing?' });\nfor await (const researchEvent of stream) {\n  console.log(researchEvent);\n}\n```",
  },
  {
    name: 'json',
    endpoint: '/extract/json',
    httpMethod: 'post',
    summary: 'JSON',
    description: 'Fetches a URL and extracts structured data according to a provided JSON schema',
    stainlessPath: '(resource) extract > (method) json',
    qualified: 'client.extract.json',
    params: [
      'json_schema: object;',
      'url: string;',
      "effort?: 'min' | 'standard' | 'max';",
      'geo_target?: { country?: string; };',
      'nocache?: boolean;',
    ],
    response: 'object',
    markdown:
      "## json\n\n`client.extract.json(json_schema: object, url: string, effort?: 'min' | 'standard' | 'max', geo_target?: { country?: string; }, nocache?: boolean): object`\n\n**post** `/extract/json`\n\nFetches a URL and extracts structured data according to a provided JSON schema\n\n### Parameters\n\n- `json_schema: object`\n  JSON schema definition that describes the structure of data to extract.\n\n- `url: string`\n  URL to fetch and extract data from\n\n- `effort?: 'min' | 'standard' | 'max'`\n  Fetch effort level controlling speed vs. capability tradeoff. \"min\": fastest, no fallback (1-5s). \"standard\": balanced with enhanced reliability (default, 3-15s). \"max\": full browser rendering for JS-heavy sites (15-60s).\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., \"US\", \"GB\", \"JP\").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `nocache?: boolean`\n  Bypass cache and force fresh data retrieval\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst response = await client.extract.json({\n  json_schema: {\n  properties: { stories: {\n  items: {\n  properties: {\n  author: { description: 'Author username', type: 'string' },\n  points: { description: 'Story points', type: 'number' },\n  title: { description: 'Story title', type: 'string' },\n},\n  type: 'object',\n},\n  type: 'array',\n} },\n  type: 'object',\n},\n  url: 'https://news.ycombinator.com',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'markdown',
    endpoint: '/extract/markdown',
    httpMethod: 'post',
    summary: 'Markdown',
    description:
      'Fetches a URL and converts its HTML content to clean Markdown format with optional metadata extraction',
    stainlessPath: '(resource) extract > (method) markdown',
    qualified: 'client.extract.markdown',
    params: [
      'url: string;',
      "effort?: 'min' | 'standard' | 'max';",
      'geo_target?: { country?: string; };',
      'metadata?: boolean;',
      'nocache?: boolean;',
    ],
    response:
      '{ content: string; url: string; metadata?: { author?: string; created_at?: string; creator?: string; description?: string; image?: string; keywords?: string[]; modified_at?: string; page_count?: number; pdf_version?: string; producer?: string; publisher?: string; site_name?: string; subject?: string; title?: string; type?: string; url?: string; }; }',
    markdown:
      "## markdown\n\n`client.extract.markdown(url: string, effort?: 'min' | 'standard' | 'max', geo_target?: { country?: string; }, metadata?: boolean, nocache?: boolean): { content: string; url: string; metadata?: object; }`\n\n**post** `/extract/markdown`\n\nFetches a URL and converts its HTML content to clean Markdown format with optional metadata extraction\n\n### Parameters\n\n- `url: string`\n  URL to fetch and convert to markdown\n\n- `effort?: 'min' | 'standard' | 'max'`\n  Fetch effort level controlling speed vs. capability tradeoff. \"min\": fastest, no fallback (1-5s). \"standard\": balanced with enhanced reliability (default, 3-15s). \"max\": full browser rendering for JS-heavy sites (15-60s).\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., \"US\", \"GB\", \"JP\").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `metadata?: boolean`\n  Include extracted metadata (Open Graph and HTML metadata) as a separate field in the response\n\n- `nocache?: boolean`\n  Bypass cache and force fresh data retrieval\n\n### Returns\n\n- `{ content: string; url: string; metadata?: { author?: string; created_at?: string; creator?: string; description?: string; image?: string; keywords?: string[]; modified_at?: string; page_count?: number; pdf_version?: string; producer?: string; publisher?: string; site_name?: string; subject?: string; title?: string; type?: string; url?: string; }; }`\n\n  - `content: string`\n  - `url: string`\n  - `metadata?: { author?: string; created_at?: string; creator?: string; description?: string; image?: string; keywords?: string[]; modified_at?: string; page_count?: number; pdf_version?: string; producer?: string; publisher?: string; site_name?: string; subject?: string; title?: string; type?: string; url?: string; }`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst response = await client.extract.markdown({ url: 'https://example.com/blog/article' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'json',
    endpoint: '/generate/json',
    httpMethod: 'post',
    summary: 'JSON',
    description:
      'Fetches URL content, extracts data, and transforms it using AI based on custom instructions. Use this to generate new content, summaries, or restructured data.',
    stainlessPath: '(resource) generate > (method) json',
    qualified: 'client.generate.json',
    params: [
      'instructions: string;',
      'json_schema: object;',
      'url: string;',
      "effort?: 'min' | 'standard' | 'max';",
      'geo_target?: { country?: string; };',
      'nocache?: boolean;',
    ],
    response: 'object',
    markdown:
      "## json\n\n`client.generate.json(instructions: string, json_schema: object, url: string, effort?: 'min' | 'standard' | 'max', geo_target?: { country?: string; }, nocache?: boolean): object`\n\n**post** `/generate/json`\n\nFetches URL content, extracts data, and transforms it using AI based on custom instructions. Use this to generate new content, summaries, or restructured data.\n\n### Parameters\n\n- `instructions: string`\n  Instructions describing how to transform the data\n\n- `json_schema: object`\n  JSON schema defining the structure of the transformed output\n\n- `url: string`\n  URL to fetch content from\n\n- `effort?: 'min' | 'standard' | 'max'`\n  Fetch effort level controlling speed vs. capability tradeoff. \"min\": fastest, no fallback (1-5s). \"standard\": balanced with enhanced reliability (default, 3-15s). \"max\": full browser rendering for JS-heavy sites (15-60s).\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., \"US\", \"GB\", \"JP\").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `nocache?: boolean`\n  Bypass cache and force fresh data retrieval\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst response = await client.generate.json({\n  instructions: 'For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\\'s about in simple terms.',\n  json_schema: {\n  properties: { summaries: {\n  items: {\n  properties: {\n  category: { description: 'Story category (tech/business/science/etc)', type: 'string' },\n  summary: { description: 'One-sentence summary of the story', type: 'string' },\n  title: { description: 'Story title', type: 'string' },\n},\n  type: 'object',\n},\n  type: 'array',\n} },\n  type: 'object',\n},\n  url: 'https://news.ycombinator.com',\n});\n\nconsole.log(response);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
