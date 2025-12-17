// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Tabstack from 'tabstack';

const client = new Tabstack({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource agent', () => {
  // Prism doesn't support text/event-stream responses
  test.skip('automate: only required params', async () => {
    const responsePromise = client.agent.automate({
      task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism doesn't support text/event-stream responses
  test.skip('automate: required and optional params', async () => {
    const response = await client.agent.automate({
      task: 'Find the top 3 trending repositories and extract their names, descriptions, and star counts',
      data: {},
      guardrails: "browse and extract only, don't interact with repositories",
      maxIterations: 50,
      maxValidationAttempts: 3,
      url: 'https://github.com/trending',
    });
  });
});
