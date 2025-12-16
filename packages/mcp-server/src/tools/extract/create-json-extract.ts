// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'tabstack-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'tabstack-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Tabstack from 'tabstack';

export const metadata: Metadata = {
  resource: 'extract',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/extract/json',
  operationId: 'extractJsonV1',
};

export const tool: Tool = {
  name: 'create_json_extract',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetches a URL and extracts structured data according to a provided JSON schema\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/extract_create_json_response',\n  $defs: {\n    extract_create_json_response: {\n      type: 'object',\n      description: 'The extracted data matching the provided schema',\n      additionalProperties: true\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      json_schema: {
        type: 'object',
        description: 'JSON schema definition that describes the structure of data to extract.',
        additionalProperties: true,
      },
      url: {
        type: 'string',
        description: 'URL to fetch and extract data from',
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
    required: ['json_schema', 'url'],
  },
  annotations: {},
};

export const handler = async (client: Tabstack, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.extract.createJson(body)));
  } catch (error) {
    if (error instanceof Tabstack.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
