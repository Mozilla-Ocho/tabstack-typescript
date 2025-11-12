/**
 * Internal HTTP client for TABStack AI SDK
 */

import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import {
  TABStackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from '../exceptions';

export interface HTTPClientOptions {
  apiKey: string;
  baseURL?: string;
}

export class HTTPClient {
  private apiKey: string;
  private baseURL: string;

  constructor(options: HTTPClientOptions) {
    this.apiKey = options.apiKey;
    this.baseURL = (options.baseURL || 'https://api.tabstack.ai/').replace(/\/$/, '');
  }

  /**
   * Get default headers for requests
   */
  private getHeaders(contentType: string = 'application/json'): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': contentType,
      Accept: 'application/json',
      'User-Agent': '@tabstack/sdk/1.0.0',
    };
  }

  /**
   * Handle error responses and throw appropriate exceptions
   */
  private handleErrorResponse(status: number, body: string): never {
    let errorMessage: string;
    try {
      const errorData = JSON.parse(body) as { error?: string };
      errorMessage = errorData.error ?? 'Unknown error';
    } catch {
      errorMessage = body || 'Unknown error';
    }

    switch (status) {
      case 400:
        throw new BadRequestError(errorMessage);
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 422:
        throw new InvalidURLError(errorMessage);
      case 500:
        throw new ServerError(errorMessage);
      case 503:
        throw new ServiceUnavailableError(errorMessage);
      default:
        throw new APIError(errorMessage, status);
    }
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(path: string, data?: Record<string, unknown>): Promise<T> {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify(data || {});
      const headers = this.getHeaders();

      const url = new URL(path, this.baseURL);
      const options: https.RequestOptions = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          ...headers,
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const client = url.protocol === 'https:' ? https : http;

      const req = client.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          const responseBody = Buffer.concat(chunks).toString('utf-8');

          if (res.statusCode && res.statusCode >= 400) {
            try {
              this.handleErrorResponse(res.statusCode, responseBody);
            } catch (err) {
              reject(err instanceof Error ? err : new Error(String(err)));
            }
            return;
          }

          try {
            const parsed = responseBody ? (JSON.parse(responseBody) as T) : ({} as T);
            resolve(parsed);
          } catch {
            reject(new TABStackError('Failed to parse response JSON'));
          }
        });
      });

      req.on('error', (error) => {
        reject(new TABStackError(`Request failed: ${error.message}`));
      });

      req.write(body);
      req.end();
    });
  }

  /**
   * Make a POST request with streaming response (Server-Sent Events)
   */
  async *postStream(
    path: string,
    data?: Record<string, unknown>
  ): AsyncGenerator<string, void, undefined> {
    const body = JSON.stringify(data || {});
    const headers = this.getHeaders();
    headers.Accept = 'text/event-stream';

    const url = new URL(path, this.baseURL);
    const options: https.RequestOptions = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const client = url.protocol === 'https:' ? https : http;

    const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
      const req = client.request(options, (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          const chunks: Buffer[] = [];
          response.on('data', (chunk: Buffer) => chunks.push(chunk));
          response.on('end', () => {
            const responseBody = Buffer.concat(chunks).toString('utf-8');
            try {
              this.handleErrorResponse(response.statusCode!, responseBody);
            } catch (err) {
              reject(err instanceof Error ? err : new Error(String(err)));
            }
          });
          return;
        }
        resolve(response);
      });

      req.on('error', (error) => {
        reject(new TABStackError(`Request failed: ${error.message}`));
      });

      req.write(body);
      req.end();
    });

    // Stream lines from the response
    let buffer = '';
    for await (const chunk of res) {
      buffer += (chunk as Buffer).toString('utf-8');

      while (buffer.includes('\n')) {
        const newlineIndex = buffer.indexOf('\n');
        const line = buffer.slice(0, newlineIndex).replace(/\r$/, '');
        buffer = buffer.slice(newlineIndex + 1);

        if (line) {
          yield line;
        }
      }
    }

    // Yield any remaining data
    if (buffer.trim()) {
      yield buffer.trim();
    }
  }
}
