// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'tabstack-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'tabstack-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Tabstack from 'tabstack';

export const metadata: Metadata = {
  resource: 'agent',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/automate',
  operationId: 'automateV1',
};

export const tool: Tool = {
  name: 'automate_agent',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nExecute AI-powered browser automation tasks using natural language. This endpoint **always streams** responses using Server-Sent Events (SSE).\n\n**Streaming Response:**\n- All responses are streamed using Server-Sent Events (`text/event-stream`)\n- Real-time progress updates and results as they're generated\n\n**Use Cases:**\n- Web scraping and data extraction\n- Form filling and interaction\n- Navigation and information gathering\n- Multi-step web workflows\n- Content analysis from web pages\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/agent_automate_response',\n  $defs: {\n    agent_automate_response: {\n      type: 'string'\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      task: {
        type: 'string',
        description: 'The task description in natural language',
      },
      data: {
        type: 'object',
        description: 'JSON data to provide context for form filling or complex tasks',
        additionalProperties: true,
      },
      guardrails: {
        type: 'string',
        description: 'Safety constraints for execution',
      },
      maxIterations: {
        type: 'integer',
        description: 'Maximum task iterations',
      },
      maxValidationAttempts: {
        type: 'integer',
        description: 'Maximum validation attempts',
      },
      url: {
        type: 'string',
        description: 'Starting URL for the task',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['task'],
  },
  annotations: {},
};

export const handler = async (client: Tabstack, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.agent.automate(body)));
  } catch (error) {
    if (error instanceof Tabstack.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
