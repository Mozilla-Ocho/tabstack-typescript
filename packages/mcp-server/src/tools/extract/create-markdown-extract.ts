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
  httpPath: '/extract/markdown',
  operationId: 'extractMarkdownV1',
};

export const tool: Tool = {
  name: 'create_markdown_extract',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetches a URL and converts its HTML content to clean Markdown format with optional metadata extraction\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/extract_create_markdown_response',\n  $defs: {\n    extract_create_markdown_response: {\n      type: 'object',\n      properties: {\n        content: {\n          type: 'string',\n          description: 'The markdown content (includes metadata as YAML frontmatter by default)'\n        },\n        url: {\n          type: 'string',\n          description: 'The URL that was converted to markdown'\n        },\n        metadata: {\n          type: 'object',\n          description: 'Extracted metadata from the page (only included when metadata parameter is true)',\n          properties: {\n            author: {\n              type: 'string',\n              description: 'Author information from HTML metadata'\n            },\n            description: {\n              type: 'string',\n              description: 'Page description from Open Graph or HTML'\n            },\n            image: {\n              type: 'string',\n              description: 'Featured image URL from Open Graph'\n            },\n            publisher: {\n              type: 'string',\n              description: 'Publisher information from Open Graph'\n            },\n            site_name: {\n              type: 'string',\n              description: 'Site name from Open Graph'\n            },\n            title: {\n              type: 'string',\n              description: 'Page title from Open Graph or HTML'\n            },\n            type: {\n              type: 'string',\n              description: 'Content type from Open Graph (e.g., article, website)'\n            },\n            url: {\n              type: 'string',\n              description: 'Canonical URL from Open Graph'\n            }\n          }\n        }\n      },\n      required: [        'content',\n        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL to fetch and convert to markdown',
      },
      metadata: {
        type: 'boolean',
        description:
          'Include extracted metadata (Open Graph and HTML metadata) as a separate field in the response',
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
    required: ['url'],
  },
  annotations: {},
};

export const handler = async (client: Tabstack, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.extract.createMarkdown(body)));
  } catch (error) {
    if (error instanceof Tabstack.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
