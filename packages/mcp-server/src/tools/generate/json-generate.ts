// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'tabstack-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'tabstack-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Tabstack from 'tabstack';

export const metadata: Metadata = {
  resource: 'generate',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/generate/json',
  operationId: 'generateJsonV1',
};

export const tool: Tool = {
  name: 'json_generate',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetches URL content, extracts data, and transforms it using AI based on custom instructions. Use this to generate new content, summaries, or restructured data.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/generate_json_response',\n  $defs: {\n    generate_json_response: {\n      type: 'object',\n      additionalProperties: true\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      instructions: {
        type: 'string',
        description: 'Instructions describing how to transform the data',
      },
      json_schema: {
        type: 'object',
        description: 'JSON schema defining the structure of the transformed output',
        additionalProperties: true,
      },
      url: {
        type: 'string',
        description: 'URL to fetch content from',
      },
      nocache: {
        type: 'boolean',
        description: 'Bypass cache and force fresh data retrieval',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['instructions', 'json_schema', 'url'],
  },
  annotations: {},
};

export const handler = async (client: Tabstack, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.generate.json(body)));
  } catch (error) {
    if (error instanceof Tabstack.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
