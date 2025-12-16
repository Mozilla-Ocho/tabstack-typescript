// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Tabstack from 'tabstack';

const client = new Tabstack({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource generate', () => {
  // Prism tests are disabled
  test.skip('createJson: only required params', async () => {
    const responsePromise = client.generate.createJson({
      instructions:
        "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms.",
      json_schema: {
        type: 'object',
        properties: {
          summaries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Story title' },
                category: { type: 'string', description: 'Story category (tech/business/science/etc)' },
                summary: { type: 'string', description: 'One-sentence summary of the story' },
              },
            },
          },
        },
      },
      url: 'https://news.ycombinator.com',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createJson: required and optional params', async () => {
    const response = await client.generate.createJson({
      instructions:
        "For each story, categorize it (tech/business/science/other) and write a one-sentence summary explaining what it's about in simple terms.",
      json_schema: {
        type: 'object',
        properties: {
          summaries: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Story title' },
                category: { type: 'string', description: 'Story category (tech/business/science/etc)' },
                summary: { type: 'string', description: 'One-sentence summary of the story' },
              },
            },
          },
        },
      },
      url: 'https://news.ycombinator.com',
      nocache: false,
    });
  });
});
