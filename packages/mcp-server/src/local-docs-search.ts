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
      'interactive?: boolean;',
      'maxIterations?: number;',
      'maxValidationAttempts?: number;',
      'url?: string;',
    ],
    response:
      'object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object | object',
    markdown:
      "## automate\n\n`client.agent.automate(task: string, data?: object, geo_target?: { country?: string; }, guardrails?: string, interactive?: boolean, maxIterations?: number, maxValidationAttempts?: number, url?: string): { data: object; event: 'agent:action'; } | { data: object; event: 'agent:extracted'; } | { data: object; event: 'agent:processing'; } | { data: object; event: 'agent:reasoned'; } | { data: object; event: 'agent:status'; } | { data: object; event: 'agent:step'; } | { data: object; event: 'agent:waiting'; } | { data: object; event: 'ai:generation'; } | { data: object; event: 'ai:generation:error'; } | { data: object; event: 'browser:action_completed'; } | { data: object; event: 'browser:action_started'; } | { data: object; event: 'browser:navigated'; } | { data: object; event: 'browser:reconnected'; } | { data: object; event: 'browser:screenshot_captured'; } | { data: object; event: 'browser:screenshot_captured_image'; } | { data: object; event: 'cdp:endpoint_connected'; } | { data: object; event: 'cdp:endpoint_cycle'; } | { data: object; event: 'interactive:form_data:error'; } | { data: object; event: 'interactive:form_data:request'; } | { data: object; event: 'system:debug_compression'; } | { data: object; event: 'system:debug_message'; } | { data: object; event: 'task:aborted'; } | { data: object; event: 'task:completed'; } | { data: object; event: 'task:metrics'; } | { data: object; event: 'task:metrics_incremental'; } | { data: object; event: 'task:setup'; } | { data: object; event: 'task:started'; } | { data: object; event: 'task:validated'; } | { data: object; event: 'task:validation_error'; }`\n\n**post** `/automate`\n\nExecute AI-powered browser automation tasks using natural language with optional geotargeting. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates and results as they're generated\n\n**Geotargeting:**\n- Optionally specify a country code for geotargeted browsing\n\n**Use Cases:**\n- Web scraping and data extraction\n- Form filling and interaction\n- Navigation and information gathering\n- Multi-step web workflows\n- Content analysis from web pages\n\n### Parameters\n\n- `task: string`\n  The task description in natural language\n\n- `data?: object`\n  JSON data to provide context for form filling or complex tasks\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., \"US\", \"GB\", \"JP\").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `guardrails?: string`\n  Safety constraints for execution\n\n- `interactive?: boolean`\n  Enable interactive mode to allow human-in-the-loop input during task execution\n\n- `maxIterations?: number`\n  Maximum task iterations\n\n- `maxValidationAttempts?: number`\n  Maximum validation attempts\n\n- `url?: string`\n  Starting URL for the task\n\n### Returns\n\n- `{ data: { action: string; iterationId: string; timestamp: number; ref?: string; value?: string; }; event: 'agent:action'; } | { data: { extractedData: string; iterationId: string; timestamp: number; }; event: 'agent:extracted'; } | { data: { hasScreenshot: boolean; iterationId: string; operation: string; timestamp: number; }; event: 'agent:processing'; } | { data: { iterationId: string; reasoning: string; timestamp: number; }; event: 'agent:reasoned'; } | { data: { iterationId: string; message: string; timestamp: number; }; event: 'agent:status'; } | { data: { currentIteration: number; iterationId: string; timestamp: number; }; event: 'agent:step'; } | { data: { iterationId: string; seconds: number; timestamp: number; }; event: 'agent:waiting'; } | { data: { finishReason: 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other'; iterationId: string; prompt: string; schema: object; timestamp: number; usage: { inputTokens?: number; outputTokens?: number; totalTokens?: number; }; messages?: { content: string; role: 'system'; providerOptions?: object; } | { content: string | object | object | object[]; role: 'user'; providerOptions?: object; } | { content: string | object | object | object | object | object | object[]; role: 'assistant'; providerOptions?: object; } | { content: object | object[]; role: 'tool'; providerOptions?: object; }[]; object?: object; providerMetadata?: object; temperature?: number; warnings?: object[]; }; event: 'ai:generation'; } | { data: { error: string; iterationId: string; prompt: string; schema: object; timestamp: number; messages?: object[]; }; event: 'ai:generation:error'; } | { data: { iterationId: string; success: boolean; timestamp: number; error?: string; }; event: 'browser:action_completed'; } | { data: { action: string; iterationId: string; timestamp: number; ref?: string; value?: string; }; event: 'browser:action_started'; } | { data: { iterationId: string; timestamp: number; title: string; url: string; }; event: 'browser:navigated'; } | { data: { endpointIndex: number; iterationId: string; startingUrl: string; timestamp: number; total: number; }; event: 'browser:reconnected'; } | { data: { format: 'jpeg' | 'png'; iterationId: string; size: number; timestamp: number; }; event: 'browser:screenshot_captured'; } | { data: { image: string; iterationId: string; mediaType: 'image/jpeg' | 'image/png'; timestamp: number; }; event: 'browser:screenshot_captured_image'; } | { data: { endpointIndex: number; iterationId: string; timestamp: number; total: number; }; event: 'cdp:endpoint_connected'; } | { data: { attempt: number; error: string; iterationId: string; timestamp: number; total: number; }; event: 'cdp:endpoint_cycle'; } | { data: { fieldErrors: object; fields: { fieldType: string; label: string; ref: string; required: boolean; currentValue?: string; description?: string; options?: string[]; }[]; formDescription: string; iterationId: string; pageTitle: string; pageUrl: string; requestId: string; timestamp: number; }; event: 'interactive:form_data:error'; } | { data: { fields: { fieldType: string; label: string; ref: string; required: boolean; currentValue?: string; description?: string; options?: string[]; }[]; formDescription: string; iterationId: string; pageTitle: string; pageUrl: string; requestId: string; timestamp: number; }; event: 'interactive:form_data:request'; } | { data: { compressedSize: number; compressionPercent: number; iterationId: string; originalSize: number; timestamp: number; }; event: 'system:debug_compression'; } | { data: { iterationId: string; messages: object[]; timestamp: number; }; event: 'system:debug_message'; } | { data: { finalAnswer: string; iterationId: string; reason: string; timestamp: number; }; event: 'task:aborted'; } | { data: { finalAnswer: string; iterationId: string; timestamp: number; success?: boolean; }; event: 'task:completed'; } | { data: { aiGenerationCount: number; aiGenerationErrorCount: number; eventCounts: object; iterationId: string; stepCount: number; timestamp: number; totalInputTokens: number; totalOutputTokens: number; }; event: 'task:metrics'; } | { data: { aiGenerationCount: number; aiGenerationErrorCount: number; eventCounts: object; iterationId: string; stepCount: number; timestamp: number; totalInputTokens: number; totalOutputTokens: number; }; event: 'task:metrics_incremental'; } | { data: { browserName: string; iterationId: string; task: string; timestamp: number; data?: object; guardrails?: string; hasApiKey?: boolean; keySource?: 'global' | 'env' | 'not_set'; model?: string; provider?: string; proxy?: string; pwCdpEndpoint?: string; pwCdpEndpointCount?: number; pwCdpEndpoints?: string[]; pwEndpoint?: string; url?: string; vision?: boolean; }; event: 'task:setup'; } | { data: { iterationId: string; plan: string; successCriteria: string; task: string; timestamp: number; url: string; actionItems?: string[]; }; event: 'task:started'; } | { data: { completionQuality: 'failed' | 'partial' | 'complete' | 'excellent'; finalAnswer: string; iterationId: string; observation: string; timestamp: number; feedback?: string; }; event: 'task:validated'; } | { data: { errors: string[]; iterationId: string; rawResponse: object; retryCount: number; timestamp: number; }; event: 'task:validation_error'; }`\n  A Server-Sent Event from /v1/automate. Typed discriminated union keyed on event.\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst stream = await client.agent.automate({ task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts' });\nfor await (const automateEvent of stream) {\n  console.log(automateEvent);\n}\n```",
    perLanguage: {
      go: {
        method: 'client.Agent.Automate',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstream := client.Agent.AutomateStreaming(context.TODO(), tabstack.AgentAutomateParams{\n\t\tTask:       "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n\t\tGuardrails: tabstack.String("browse and extract only, don\'t interact with repositories"),\n\t\tURL:        tabstack.String("https://github.com/trending"),\n\t})\n\tfor stream.Next() {\n\t\tfmt.Printf("%+v\\n", stream.Current())\n\t}\n\terr := stream.Err()\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.tabstack.ai/v1/automate \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $TABSTACK_API_KEY" \\\n    -d "{\n          \\"task\\": \\"Find the top 3 trending repositories and extract their names, descriptions, and star counts\\",\n          \\"guardrails\\": \\"browse and extract only, don\'t interact with repositories\\",\n          \\"maxIterations\\": 50,\n          \\"maxValidationAttempts\\": 3,\n          \\"url\\": \\"https://github.com/trending\\"\n        }"',
      },
      python: {
        method: 'agent.automate',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nfor agent in client.agent.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n    guardrails="browse and extract only, don\'t interact with repositories",\n    url="https://github.com/trending",\n):\n  print(agent)',
      },
      typescript: {
        method: 'client.agent.automate',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst automateEvent = await client.agent.automate({\n  task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n  guardrails: \"browse and extract only, don't interact with repositories\",\n  url: 'https://github.com/trending',\n});\n\nconsole.log(automateEvent);",
      },
    },
  },
  {
    name: 'automate_input',
    endpoint: '/automate/{requestID}/input',
    httpMethod: 'post',
    summary: 'Submit Input Response',
    description:
      "Submit a response to an interactive form data request from an in-progress automation task. When the AI agent encounters a form requiring user data, it emits an `interactive:form_data:request` or `interactive:form_data:error` SSE event containing a `requestId`. Use this endpoint to provide the requested data or cancel the request.\n\n**Lifecycle:**\n- Input requests expire after 2 minutes by default\n- Expired or already-answered requests return `410 Gone`\n- Successful submissions return `202 Accepted` (fire-and-forget from caller's perspective)",
    stainlessPath: '(resource) agent > (method) automate_input',
    qualified: 'client.agent.automateInput',
    params: ['requestID: string;', 'cancelled?: boolean;', 'fields?: { ref?: string; value?: string; }[];'],
    response: '{ status?: string; }',
    markdown:
      "## automate_input\n\n`client.agent.automateInput(requestID: string, cancelled?: boolean, fields?: { ref?: string; value?: string; }[]): { status?: string; }`\n\n**post** `/automate/{requestID}/input`\n\nSubmit a response to an interactive form data request from an in-progress automation task. When the AI agent encounters a form requiring user data, it emits an `interactive:form_data:request` or `interactive:form_data:error` SSE event containing a `requestId`. Use this endpoint to provide the requested data or cancel the request.\n\n**Lifecycle:**\n- Input requests expire after 2 minutes by default\n- Expired or already-answered requests return `410 Gone`\n- Successful submissions return `202 Accepted` (fire-and-forget from caller's perspective)\n\n### Parameters\n\n- `requestID: string`\n\n- `cancelled?: boolean`\n  Set to true to cancel/decline the request\n\n- `fields?: { ref?: string; value?: string; }[]`\n  Field values as array of {ref, value} pairs (required when not cancelled)\n\n### Returns\n\n- `{ status?: string; }`\n\n  - `status?: string`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst response = await client.agent.automateInput('requestID');\n\nconsole.log(response);\n```",
    perLanguage: {
      go: {
        method: 'client.Agent.AutomateInput',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Agent.AutomateInput(\n\t\tcontext.TODO(),\n\t\t"requestID",\n\t\ttabstack.AgentAutomateInputParams{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Status)\n}\n',
      },
      http: {
        example:
          "curl https://api.tabstack.ai/v1/automate/$REQUEST_ID/input \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $TABSTACK_API_KEY\" \\\n    -d '{}'",
      },
      python: {
        method: 'agent.automate_input',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.agent.automate_input(\n    request_id="requestID",\n)\nprint(response.status)',
      },
      typescript: {
        method: 'client.agent.automateInput',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.agent.automateInput('requestID');\n\nconsole.log(response.status);",
      },
    },
  },
  {
    name: 'research',
    endpoint: '/research',
    httpMethod: 'post',
    summary: 'Research',
    description:
      'Execute AI-powered research queries that search the web, analyze sources, and synthesize comprehensive answers. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates as research progresses through phases\n\n**Research Modes:**\n- `fast` - Quick answers with minimal web searches (default)\n- `balanced` - Standard research with multiple iterations\n\n**Use Cases:**\n- Answering complex questions with cited sources\n- Synthesizing information from multiple web sources\n- Research reports on specific topics\n- Fact-checking and verification tasks',
    stainlessPath: '(resource) agent > (method) research',
    qualified: 'client.agent.research',
    params: [
      'query: string;',
      'fetch_timeout?: number;',
      "mode?: 'fast' | 'balanced';",
      'nocache?: boolean;',
    ],
    response:
      "{ data: object; event: 'analyzing:end'; } | { data: object; event: 'analyzing:start'; } | { data: object; event: 'complete'; } | { data: object; event: 'error'; } | { data: object; event: 'evaluating:end'; } | { data: object; event: 'evaluating:start'; } | { data: object; event: 'following:end'; } | { data: object; event: 'following:start'; } | { data: object; event: 'iteration:end'; } | { data: object; event: 'iteration:start'; } | { data: object; event: 'judging:end'; } | { data: object; event: 'judging:start'; } | { data: object; event: 'outlining:end'; } | { data: object; event: 'outlining:start'; } | { data: object; event: 'planning:end'; } | { data: object; event: 'planning:start'; } | { data: object; event: 'prefetching:end'; } | { data: object; event: 'prefetching:start'; } | { data: object; event: 'searching:end'; } | { data: object; event: 'searching:start'; } | { data: object; event: 'start'; } | { data: object; event: 'writing:end'; } | { data: object; event: 'writing:start'; }",
    markdown:
      "## research\n\n`client.agent.research(query: string, fetch_timeout?: number, mode?: 'fast' | 'balanced', nocache?: boolean): { data: object; event: 'analyzing:end'; } | { data: object; event: 'analyzing:start'; } | { data: object; event: 'complete'; } | { data: object; event: 'error'; } | { data: object; event: 'evaluating:end'; } | { data: object; event: 'evaluating:start'; } | { data: object; event: 'following:end'; } | { data: object; event: 'following:start'; } | { data: object; event: 'iteration:end'; } | { data: object; event: 'iteration:start'; } | { data: object; event: 'judging:end'; } | { data: object; event: 'judging:start'; } | { data: object; event: 'outlining:end'; } | { data: object; event: 'outlining:start'; } | { data: object; event: 'planning:end'; } | { data: object; event: 'planning:start'; } | { data: object; event: 'prefetching:end'; } | { data: object; event: 'prefetching:start'; } | { data: object; event: 'searching:end'; } | { data: object; event: 'searching:start'; } | { data: object; event: 'start'; } | { data: object; event: 'writing:end'; } | { data: object; event: 'writing:start'; }`\n\n**post** `/research`\n\nExecute AI-powered research queries that search the web, analyze sources, and synthesize comprehensive answers. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates as research progresses through phases\n\n**Research Modes:**\n- `fast` - Quick answers with minimal web searches (default)\n- `balanced` - Standard research with multiple iterations\n\n**Use Cases:**\n- Answering complex questions with cited sources\n- Synthesizing information from multiple web sources\n- Research reports on specific topics\n- Fact-checking and verification tasks\n\n### Parameters\n\n- `query: string`\n  The research query or question to answer. Maximum 10,000 characters.\n\n- `fetch_timeout?: number`\n  Timeout in seconds for fetching web pages\n\n- `mode?: 'fast' | 'balanced'`\n  Research mode: fast (quick answers, default), balanced (standard research)\n\n- `nocache?: boolean`\n  Skip cache and force fresh research\n\n### Returns\n\n- `{ data: { analyzed: number; failed: number; iteration: number; message: string; samples: { domain: string; title: string; url: string; urlSource: 'user-input' | 'search-result' | 'extracted-link'; relevance?: 'low' | 'medium' | 'high'; reliability?: 'low' | 'medium' | 'high'; summary?: string; }[]; timestamp: number; }; event: 'analyzing:end'; } | { data: { iteration: number; message: string; pageCount: number; timestamp: number; }; event: 'analyzing:start'; } | { data: { message: string; metadata: { executedQueries: string[][]; mode: 'fast' | 'balanced' | 'deep' | 'max' | 'ultra'; prompt: string; queryComplexity: 'simple' | 'moderate' | 'complex'; researchObjective: string; researchPlan: string; researchQuestions: string[]; totalPagesAnalyzed: number; citedPages?: object[]; gapEvaluations?: object[]; judgments?: object[]; metrics?: object; outline?: object; urlSources?: object; }; report: string; timestamp: number; }; event: 'complete'; } | { data: { error: { message: string; name: string; stack?: string; }; message: string; timestamp: number; activity?: string; iteration?: number; }; event: 'error'; } | { data: { coverage: 'Light' | 'Moderate' | 'Solid' | 'Comprehensive'; gaps: string; iteration: number; message: string; nextQueries: string[]; questionAssessments: { findings: string; question: string; status: 'answered' | 'partial' | 'unanswered'; }[]; shouldContinue: boolean; timestamp: number; }; event: 'evaluating:end'; } | { data: { iteration: number; message: string; pagesAnalyzed: number; questionCount: number; timestamp: number; }; event: 'evaluating:start'; } | { data: { failed: number; followed: number; iteration: number; message: string; samples: { domain: string; title: string; url: string; urlSource: 'user-input' | 'search-result' | 'extracted-link'; relevance?: 'low' | 'medium' | 'high'; reliability?: 'low' | 'medium' | 'high'; summary?: string; }[]; timestamp: number; }; event: 'following:end'; } | { data: { iteration: number; linkCount: number; message: string; timestamp: number; }; event: 'following:start'; } | { data: { isLast: boolean; iteration: number; message: string; timestamp: number; stopReason?: 'max_iterations' | 'coverage_sufficient'; }; event: 'iteration:end'; } | { data: { iteration: number; maxIterations: number; message: string; queries: string[]; timestamp: number; }; event: 'iteration:start'; } | { data: { approved: boolean; attempt: number; message: string; score: number; timestamp: number; feedback?: string; }; event: 'judging:end'; } | { data: { attempt: number; maxAttempts: number; message: string; timestamp: number; }; event: 'judging:start'; } | { data: { message: string; sourcesSelected: number; timestamp: number; }; event: 'outlining:end'; } | { data: { message: string; pagesAnalyzed: number; qualityPageCount: number; timestamp: number; }; event: 'outlining:start'; } | { data: { complexity: 'simple' | 'moderate' | 'complex'; message: string; objective: string; plan: string; queries: string[]; questions: string[]; timestamp: number; }; event: 'planning:end'; } | { data: { hasPrefetchedContext: boolean; message: string; timestamp: number; }; event: 'planning:start'; } | { data: { failed: number; fetched: number; message: string; timestamp: number; }; event: 'prefetching:end'; } | { data: { message: string; timestamp: number; urlCount: number; urls: string[]; }; event: 'prefetching:start'; } | { data: { iteration: number; message: string; timestamp: number; urlsFound: number; urlsNew: number; }; event: 'searching:end'; } | { data: { iteration: number; message: string; queries: string[]; timestamp: number; }; event: 'searching:start'; } | { data: { message: string; timestamp: number; }; event: 'start'; } | { data: { attempt: number; message: string; timestamp: number; }; event: 'writing:end'; } | { data: { attempt: number; isRevision: boolean; maxAttempts: number; message: string; timestamp: number; previousScore?: number; }; event: 'writing:start'; }`\n  A Server-Sent Event from /v1/research. Typed discriminated union keyed on event.\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst stream = await client.agent.research({ query: 'What are the latest developments in quantum computing?' });\nfor await (const researchEvent of stream) {\n  console.log(researchEvent);\n}\n```",
    perLanguage: {
      go: {
        method: 'client.Agent.Research',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tstream := client.Agent.ResearchStreaming(context.TODO(), tabstack.AgentResearchParams{\n\t\tQuery: "What are the latest developments in quantum computing?",\n\t})\n\tfor stream.Next() {\n\t\tfmt.Printf("%+v\\n", stream.Current())\n\t}\n\terr := stream.Err()\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.tabstack.ai/v1/research \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $TABSTACK_API_KEY" \\\n    -d \'{\n          "query": "What are the latest developments in quantum computing?",\n          "fetch_timeout": 30,\n          "mode": "fast"\n        }\'',
      },
      python: {
        method: 'agent.research',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nfor agent in client.agent.research(\n    query="What are the latest developments in quantum computing?",\n):\n  print(agent)',
      },
      typescript: {
        method: 'client.agent.research',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst researchEvent = await client.agent.research({\n  query: 'What are the latest developments in quantum computing?',\n});\n\nconsole.log(researchEvent);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Extract.Json',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Extract.Json(context.TODO(), tabstack.ExtractJsonParams{\n\t\tJsonSchema: map[string]any{\n\t\t\t"properties": map[string]any{\n\t\t\t\t"stories": map[string]any{\n\t\t\t\t\t"items": map[string]any{\n\t\t\t\t\t\t"properties": map[string]any{\n\t\t\t\t\t\t\t"author": map[string]any{\n\t\t\t\t\t\t\t\t"description": "Author username",\n\t\t\t\t\t\t\t\t"type":        "string",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t"points": map[string]any{\n\t\t\t\t\t\t\t\t"description": "Story points",\n\t\t\t\t\t\t\t\t"type":        "number",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t"title": map[string]any{\n\t\t\t\t\t\t\t\t"description": "Story title",\n\t\t\t\t\t\t\t\t"type":        "string",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"type": "object",\n\t\t\t\t\t},\n\t\t\t\t\t"type": "array",\n\t\t\t\t},\n\t\t\t},\n\t\t\t"type": "object",\n\t\t},\n\t\tURL: "https://news.ycombinator.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.tabstack.ai/v1/extract/json \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $TABSTACK_API_KEY" \\\n    -d \'{\n          "json_schema": {\n            "properties": {\n              "stories": {\n                "items": {\n                  "properties": {\n                    "author": {\n                      "description": "Author username",\n                      "type": "string"\n                    },\n                    "points": {\n                      "description": "Story points",\n                      "type": "number"\n                    },\n                    "title": {\n                      "description": "Story title",\n                      "type": "string"\n                    }\n                  },\n                  "type": "object"\n                },\n                "type": "array"\n              }\n            },\n            "type": "object"\n          },\n          "url": "https://news.ycombinator.com",\n          "effort": "standard"\n        }\'',
      },
      python: {
        method: 'extract.json',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.extract.json(\n    json_schema={\n        "properties": {\n            "stories": {\n                "items": {\n                    "properties": {\n                        "author": {\n                            "description": "Author username",\n                            "type": "string",\n                        },\n                        "points": {\n                            "description": "Story points",\n                            "type": "number",\n                        },\n                        "title": {\n                            "description": "Story title",\n                            "type": "string",\n                        },\n                    },\n                    "type": "object",\n                },\n                "type": "array",\n            }\n        },\n        "type": "object",\n    },\n    url="https://news.ycombinator.com",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.extract.json',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.extract.json({\n  json_schema: {\n    properties: {\n      stories: {\n        items: {\n          properties: {\n            author: { description: 'Author username', type: 'string' },\n            points: { description: 'Story points', type: 'number' },\n            title: { description: 'Story title', type: 'string' },\n          },\n          type: 'object',\n        },\n        type: 'array',\n      },\n    },\n    type: 'object',\n  },\n  url: 'https://news.ycombinator.com',\n});\n\nconsole.log(response);",
      },
    },
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
    perLanguage: {
      go: {
        method: 'client.Extract.Markdown',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Extract.Markdown(context.TODO(), tabstack.ExtractMarkdownParams{\n\t\tURL: "https://example.com/blog/article",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Content)\n}\n',
      },
      http: {
        example:
          'curl https://api.tabstack.ai/v1/extract/markdown \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $TABSTACK_API_KEY" \\\n    -d \'{\n          "url": "https://example.com/blog/article",\n          "effort": "standard",\n          "metadata": true\n        }\'',
      },
      python: {
        method: 'extract.markdown',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.extract.markdown(\n    url="https://example.com/blog/article",\n)\nprint(response.content)',
      },
      typescript: {
        method: 'client.extract.markdown',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.extract.markdown({ url: 'https://example.com/blog/article' });\n\nconsole.log(response.content);",
      },
    },
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
      "## json\n\n`client.generate.json(instructions: string, json_schema: object, url: string, effort?: 'min' | 'standard' | 'max', geo_target?: { country?: string; }, nocache?: boolean): object`\n\n**post** `/generate/json`\n\nFetches URL content, extracts data, and transforms it using AI based on custom instructions. Use this to generate new content, summaries, or restructured data.\n\n### Parameters\n\n- `instructions: string`\n  Instructions describing how to transform the data. Maximum 20,000 characters.\n\n- `json_schema: object`\n  JSON schema defining the structure of the transformed output\n\n- `url: string`\n  URL to fetch content from\n\n- `effort?: 'min' | 'standard' | 'max'`\n  Fetch effort level controlling speed vs. capability tradeoff. \"min\": fastest, no fallback (1-5s). \"standard\": balanced with enhanced reliability (default, 3-15s). \"max\": full browser rendering for JS-heavy sites (15-60s).\n\n- `geo_target?: { country?: string; }`\n  Optional geotargeting parameters for proxy requests\n  - `country?: string`\n    Country code using ISO 3166-1 alpha-2 standard (2 letters, e.g., \"US\", \"GB\", \"JP\").\nSee: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2\n\n- `nocache?: boolean`\n  Bypass cache and force fresh data retrieval\n\n### Returns\n\n- `object`\n\n### Example\n\n```typescript\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack();\n\nconst response = await client.generate.json({\n  instructions: 'For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\\'s about in simple terms.',\n  json_schema: {\n  properties: { summaries: {\n  items: {\n  properties: {\n  category: { description: 'Story category (tech/business/science/etc)', type: 'string' },\n  summary: { description: 'One-sentence summary of the story', type: 'string' },\n  title: { description: 'Story title', type: 'string' },\n},\n  type: 'object',\n},\n  type: 'array',\n} },\n  type: 'object',\n},\n  url: 'https://news.ycombinator.com',\n});\n\nconsole.log(response);\n```",
    perLanguage: {
      go: {
        method: 'client.Generate.Json',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Generate.Json(context.TODO(), tabstack.GenerateJsonParams{\n\t\tInstructions: "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\'s about in simple terms.",\n\t\tJsonSchema: map[string]any{\n\t\t\t"properties": map[string]any{\n\t\t\t\t"summaries": map[string]any{\n\t\t\t\t\t"items": map[string]any{\n\t\t\t\t\t\t"properties": map[string]any{\n\t\t\t\t\t\t\t"category": map[string]any{\n\t\t\t\t\t\t\t\t"description": "Story category (tech/business/science/etc)",\n\t\t\t\t\t\t\t\t"type":        "string",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t"summary": map[string]any{\n\t\t\t\t\t\t\t\t"description": "One-sentence summary of the story",\n\t\t\t\t\t\t\t\t"type":        "string",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t"title": map[string]any{\n\t\t\t\t\t\t\t\t"description": "Story title",\n\t\t\t\t\t\t\t\t"type":        "string",\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t\t"type": "object",\n\t\t\t\t\t},\n\t\t\t\t\t"type": "array",\n\t\t\t\t},\n\t\t\t},\n\t\t\t"type": "object",\n\t\t},\n\t\tURL: "https://news.ycombinator.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response)\n}\n',
      },
      http: {
        example:
          'curl https://api.tabstack.ai/v1/generate/json \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $TABSTACK_API_KEY" \\\n    -d "{\n          \\"instructions\\": \\"For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\'s about in simple terms.\\",\n          \\"json_schema\\": {\n            \\"properties\\": {\n              \\"summaries\\": {\n                \\"items\\": {\n                  \\"properties\\": {\n                    \\"category\\": {\n                      \\"description\\": \\"Story category (tech/business/science/etc)\\",\n                      \\"type\\": \\"string\\"\n                    },\n                    \\"summary\\": {\n                      \\"description\\": \\"One-sentence summary of the story\\",\n                      \\"type\\": \\"string\\"\n                    },\n                    \\"title\\": {\n                      \\"description\\": \\"Story title\\",\n                      \\"type\\": \\"string\\"\n                    }\n                  },\n                  \\"type\\": \\"object\\"\n                },\n                \\"type\\": \\"array\\"\n              }\n            },\n            \\"type\\": \\"object\\"\n          },\n          \\"url\\": \\"https://news.ycombinator.com\\",\n          \\"effort\\": \\"standard\\"\n        }"',
      },
      python: {
        method: 'generate.json',
        example:
          'import os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.generate.json(\n    instructions="For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it\'s about in simple terms.",\n    json_schema={\n        "properties": {\n            "summaries": {\n                "items": {\n                    "properties": {\n                        "category": {\n                            "description": "Story category (tech/business/science/etc)",\n                            "type": "string",\n                        },\n                        "summary": {\n                            "description": "One-sentence summary of the story",\n                            "type": "string",\n                        },\n                        "title": {\n                            "description": "Story title",\n                            "type": "string",\n                        },\n                    },\n                    "type": "object",\n                },\n                "type": "array",\n            }\n        },\n        "type": "object",\n    },\n    url="https://news.ycombinator.com",\n)\nprint(response)',
      },
      typescript: {
        method: 'client.generate.json',
        example:
          "import Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.generate.json({\n  instructions:\n    \"For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms.\",\n  json_schema: {\n    properties: {\n      summaries: {\n        items: {\n          properties: {\n            category: { description: 'Story category (tech/business/science/etc)', type: 'string' },\n            summary: { description: 'One-sentence summary of the story', type: 'string' },\n            title: { description: 'Story title', type: 'string' },\n          },\n          type: 'object',\n        },\n        type: 'array',\n      },\n    },\n    type: 'object',\n  },\n  url: 'https://news.ycombinator.com',\n});\n\nconsole.log(response);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'go',
    content:
      '# Tabstack Go API Library\n\n<a href="https://pkg.go.dev/github.com/stainless-sdks/tabstack-go"><img src="https://pkg.go.dev/badge/github.com/stainless-sdks/tabstack-go.svg" alt="Go Reference"></a>\n\nThe Tabstack Go library provides convenient access to the Tabstack REST API\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Tabstack MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40tabstack%2Fsdk-mcp&config=eyJuYW1lIjoiQHRhYnN0YWNrL3Nkay1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly90YWJzdGFjay5zdGxtY3AuY29tIiwiaGVhZGVycyI6eyJ4LXRhYnN0YWNrLWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40tabstack%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftabstack.stlmcp.com%22%2C%22headers%22%3A%7B%22x-tabstack-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n\n\n```go\nimport (\n\t"github.com/stainless-sdks/tabstack-go" // imported as SDK_PackageName\n)\n```\n\n\n\nOr to pin the version:\n\n\n\n```sh\ngo get -u \'github.com/stainless-sdks/tabstack-go@v0.0.1\'\n```\n\n\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/stainless-sdks/tabstack-go"\n\t"github.com/stainless-sdks/tabstack-go/option"\n)\n\nfunc main() {\n\tclient := tabstack.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("TABSTACK_API_KEY")\n\t)\n\tstream := client.Agent.AutomateStreaming(context.TODO(), tabstack.AgentAutomateParams{\n\t\tTask: "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n\t})\n\tfor stream.Next() {\n\t\tfmt.Printf("%+v\\n", stream.Current())\n\t}\n\terr := stream.Err()\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Agent.Automate(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/stainless-sdks/tabstack-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_ = client.Agent.AutomateStreaming(context.TODO(), tabstack.AgentAutomateParams{\n\tTask: "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n})\nif stream.Err() != nil {\n\tvar apierr *tabstack.Error\n\tif errors.As(stream.Err(), &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(stream.Err().Error()) // GET "/automate": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Agent.AutomateStreaming(\n\tctx,\n\ttabstack.AgentAutomateParams{\n\t\tTask: "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n\t},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := tabstack.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Agent.AutomateStreaming(\n\tcontext.TODO(),\n\ttabstack.AgentAutomateParams{\n\t\tTask: "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n\t},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nstream := client.Agent.AutomateStreaming(\n\tcontext.TODO(),\n\ttabstack.AgentAutomateParams{\n\t\tTask: "Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n\t},\n\toption.WithResponseInto(&response),\n)\nif stream.Err() != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", automateEvent)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/tabstack-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'python',
    content:
      '# Tabstack Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/tabstack.svg?label=pypi%20(stable))](https://pypi.org/project/tabstack/)\n\nThe Tabstack Python library provides convenient access to the Tabstack REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Tabstack MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40tabstack%2Fsdk-mcp&config=eyJuYW1lIjoiQHRhYnN0YWNrL3Nkay1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly90YWJzdGFjay5zdGxtY3AuY29tIiwiaGVhZGVycyI6eyJ4LXRhYnN0YWNrLWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40tabstack%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftabstack.stlmcp.com%22%2C%22headers%22%3A%7B%22x-tabstack-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install tabstack\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom tabstack import Tabstack\n\nclient = Tabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\n\nautomate_event = client.agent.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `TABSTACK_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncTabstack` instead of `Tabstack` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom tabstack import AsyncTabstack\n\nclient = AsyncTabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  automate_event = await client.agent.automate(\n      task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n  )\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install tabstack[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom tabstack import DefaultAioHttpClient\nfrom tabstack import AsyncTabstack\n\nasync def main() -> None:\n  async with AsyncTabstack(\n    api_key=os.environ.get("TABSTACK_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    automate_event = await client.agent.automate(\n        task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n    )\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom tabstack import Tabstack\n\nclient = Tabstack()\n\nautomate_event = client.agent.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n    geo_target={},\n)\nprint(automate_event.geo_target)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `tabstack.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `tabstack.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `tabstack.APIError`.\n\n```python\nimport tabstack\nfrom tabstack import Tabstack\n\nclient = Tabstack()\n\ntry:\n    client.agent.automate(\n        task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n    )\nexcept tabstack.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept tabstack.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept tabstack.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom tabstack import Tabstack\n\n# Configure the default for all requests:\nclient = Tabstack(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).agent.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom tabstack import Tabstack\n\n# Configure the default for all requests:\nclient = Tabstack(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Tabstack(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).agent.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `TABSTACK_LOG` to `info`.\n\n```shell\n$ export TABSTACK_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom tabstack import Tabstack\n\nclient = Tabstack()\nresponse = client.agent.with_raw_response.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nagent = response.parse()  # get the object that `agent.automate()` would have returned\nprint(agent)\n```\n\nThese methods return an [`APIResponse`](https://github.com/Mozilla-Ocho/tabstack-python/tree/main/src/tabstack/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/Mozilla-Ocho/tabstack-python/tree/main/src/tabstack/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.agent.with_streaming_response.automate(\n    task="Find the top 3 trending repositories and extract their names, descriptions, and star counts",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom tabstack import Tabstack, DefaultHttpxClient\n\nclient = Tabstack(\n    # Or use the `TABSTACK_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom tabstack import Tabstack\n\nwith Tabstack() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/Mozilla-Ocho/tabstack-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport tabstack\nprint(tabstack.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Tabstack TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/@tabstack/sdk.svg?label=npm%20(stable))](https://npmjs.org/package/@tabstack/sdk) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@tabstack/sdk)\n\nThis library provides convenient access to the Tabstack REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Tabstack MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=%40tabstack%2Fsdk-mcp&config=eyJuYW1lIjoiQHRhYnN0YWNrL3Nkay1tY3AiLCJ0cmFuc3BvcnQiOiJodHRwIiwidXJsIjoiaHR0cHM6Ly90YWJzdGFjay5zdGxtY3AuY29tIiwiaGVhZGVycyI6eyJ4LXRhYnN0YWNrLWFwaS1rZXkiOiJNeSBBUEkgS2V5In19)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22%40tabstack%2Fsdk-mcp%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Ftabstack.stlmcp.com%22%2C%22headers%22%3A%7B%22x-tabstack-api-key%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install @tabstack/sdk\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst automateEvent = await client.agent.automate({\n  task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n});\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  apiKey: process.env['TABSTACK_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Tabstack.AgentAutomateParams = {\n  task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n};\nconst automateEvent: Tabstack.AutomateEvent = await client.agent.automate(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst automateEvent = await client.agent\n  .automate({\n    task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n  })\n  .catch(async (err) => {\n    if (err instanceof Tabstack.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Tabstack({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.agent.automate({ task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts' }, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Tabstack({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.agent.automate({ task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts' }, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Tabstack();\n\nconst response = await client.agent\n  .automate({\n    task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: automateEvent, response: raw } = await client.agent\n  .automate({\n    task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(automateEvent);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `TABSTACK_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Tabstack from '@tabstack/sdk';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Tabstack({\n  logger: logger.child({ name: 'Tabstack' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.agent.automate({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Tabstack from '@tabstack/sdk';\nimport fetch from 'my-fetch';\n\nconst client = new Tabstack({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Tabstack from '@tabstack/sdk';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Tabstack({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Tabstack from '@tabstack/sdk';\n\nconst client = new Tabstack({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Tabstack from 'npm:@tabstack/sdk';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Tabstack({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/Mozilla-Ocho/tabstack-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

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
