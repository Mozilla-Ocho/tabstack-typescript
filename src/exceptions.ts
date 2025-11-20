/**
 * Custom exceptions for Tabstack SDK
 */

/**
 * Base error class for all Tabstack errors
 */
export class TabstackError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'TabstackError';
    Object.setPrototypeOf(this, TabstackError.prototype);
  }
}

/**
 * Error for 400 Bad Request responses
 *
 * Raised when the request is malformed or missing required fields.
 */
export class BadRequestError extends TabstackError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequestError';
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * Error for 401 Unauthorized responses
 *
 * Raised when the API key is invalid or missing.
 */
export class UnauthorizedError extends TabstackError {
  constructor(message: string = 'Unauthorized - Invalid or missing API key') {
    super(message, 401);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Error for 422 Unprocessable Entity responses related to URLs
 *
 * Raised when the provided URL is invalid or inaccessible.
 */
export class InvalidURLError extends TabstackError {
  constructor(message: string = 'Invalid or inaccessible URL') {
    super(message, 422);
    this.name = 'InvalidURLError';
    Object.setPrototypeOf(this, InvalidURLError.prototype);
  }
}

/**
 * Error for 500 Internal Server Error responses
 *
 * Raised when the server encounters an error processing the request.
 */
export class ServerError extends TabstackError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

/**
 * Error for 503 Service Unavailable responses
 *
 * Raised when a service (e.g., automate) is not available or not configured.
 */
export class ServiceUnavailableError extends TabstackError {
  constructor(message: string = 'Service unavailable') {
    super(message, 503);
    this.name = 'ServiceUnavailableError';
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}

/**
 * Generic API error for unexpected status codes
 */
export class APIError extends TabstackError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'APIError';
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
