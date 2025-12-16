// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Tabstack from 'tabstack';

const client = new Tabstack({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource extract', () => {
  // Prism tests are disabled
  test.skip('createJson: only required params', async () => {
    const responsePromise = client.extract.createJson({
      json_schema: {
        type: 'object',
        properties: {
          stories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Story title' },
                points: { type: 'number', description: 'Story points' },
                author: { type: 'string', description: 'Author username' },
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
    const response = await client.extract.createJson({
      json_schema: {
        type: 'object',
        properties: {
          stories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string', description: 'Story title' },
                points: { type: 'number', description: 'Story points' },
                author: { type: 'string', description: 'Author username' },
              },
            },
          },
        },
      },
      url: 'https://news.ycombinator.com',
      nocache: false,
    });
  });

  // Prism tests are disabled
  test.skip('createMarkdown: only required params', async () => {
    const responsePromise = client.extract.createMarkdown({ url: 'https://example.com/blog/article' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createMarkdown: required and optional params', async () => {
    const response = await client.extract.createMarkdown({
      url: 'https://example.com/blog/article',
      metadata: true,
      nocache: false,
    });
  });
});
