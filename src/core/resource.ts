// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Tabstack } from '../client';

export abstract class APIResource {
  protected _client: Tabstack;

  constructor(client: Tabstack) {
    this._client = client;
  }
}
