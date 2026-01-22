// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Tabstack from '@tabstack/sdk';

const client = new Tabstack({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource extract', () => {
  // Prism tests are disabled
  test.skip('json: only required params', async () => {
    const responsePromise = client.extract.json({
      json_schema: {},
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
  test.skip('json: required and optional params', async () => {
    const response = await client.extract.json({
      json_schema: {},
      url: 'https://news.ycombinator.com',
      geotarget: { country: 'US' },
      nocache: false,
    });
  });

  // Prism tests are disabled
  test.skip('markdown: only required params', async () => {
    const responsePromise = client.extract.markdown({ url: 'https://example.com/blog/article' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('markdown: required and optional params', async () => {
    const response = await client.extract.markdown({
      url: 'https://example.com/blog/article',
      geotarget: { country: 'US' },
      metadata: true,
      nocache: false,
    });
  });
});
