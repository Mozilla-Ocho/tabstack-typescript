/**
 * Tests for Exception classes
 */

import {
  TabstackError,
  BadRequestError,
  UnauthorizedError,
  InvalidURLError,
  ServerError,
  ServiceUnavailableError,
  APIError,
} from './exceptions';

describe('Exception Classes', () => {
  describe('TabstackError', () => {
    it('should create error with message', () => {
      const error = new TabstackError('Test error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('TabstackError');
    });

    it('should create error with message and status code', () => {
      const error = new TabstackError('Test error', 418);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(418);
    });

    it('should create error without status code', () => {
      const error = new TabstackError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBeUndefined();
    });

    it('should have correct prototype chain', () => {
      const error = new TabstackError('Test');
      expect(Object.getPrototypeOf(error)).toBe(TabstackError.prototype);
    });

    it('should be catchable as Error', () => {
      try {
        throw new TabstackError('Test');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(TabstackError);
      }
    });
  });

  describe('BadRequestError', () => {
    it('should create error with message', () => {
      const error = new BadRequestError('Invalid request');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe('Invalid request');
      expect(error.name).toBe('BadRequestError');
    });

    it('should have status code 400', () => {
      const error = new BadRequestError('Test');
      expect(error.statusCode).toBe(400);
    });

    it('should have correct prototype chain', () => {
      const error = new BadRequestError('Test');
      expect(Object.getPrototypeOf(error)).toBe(BadRequestError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });

    it('should be catchable as TabstackError', () => {
      try {
        throw new BadRequestError('Test');
      } catch (error) {
        expect(error).toBeInstanceOf(TabstackError);
        expect(error).toBeInstanceOf(BadRequestError);
      }
    });
  });

  describe('UnauthorizedError', () => {
    it('should create error with custom message', () => {
      const error = new UnauthorizedError('Custom auth error');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(UnauthorizedError);
      expect(error.message).toBe('Custom auth error');
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should have default message', () => {
      const error = new UnauthorizedError();
      expect(error.message).toBe('Unauthorized - Invalid or missing API key');
    });

    it('should have status code 401', () => {
      const error = new UnauthorizedError();
      expect(error.statusCode).toBe(401);
    });

    it('should have correct prototype chain', () => {
      const error = new UnauthorizedError();
      expect(Object.getPrototypeOf(error)).toBe(UnauthorizedError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });
  });

  describe('InvalidURLError', () => {
    it('should create error with custom message', () => {
      const error = new InvalidURLError('URL is malformed');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(InvalidURLError);
      expect(error.message).toBe('URL is malformed');
      expect(error.name).toBe('InvalidURLError');
    });

    it('should have default message', () => {
      const error = new InvalidURLError();
      expect(error.message).toBe('Invalid or inaccessible URL');
    });

    it('should have status code 422', () => {
      const error = new InvalidURLError();
      expect(error.statusCode).toBe(422);
    });

    it('should have correct prototype chain', () => {
      const error = new InvalidURLError();
      expect(Object.getPrototypeOf(error)).toBe(InvalidURLError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });
  });

  describe('ServerError', () => {
    it('should create error with custom message', () => {
      const error = new ServerError('Database connection failed');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(ServerError);
      expect(error.message).toBe('Database connection failed');
      expect(error.name).toBe('ServerError');
    });

    it('should have default message', () => {
      const error = new ServerError();
      expect(error.message).toBe('Internal server error');
    });

    it('should have status code 500', () => {
      const error = new ServerError();
      expect(error.statusCode).toBe(500);
    });

    it('should have correct prototype chain', () => {
      const error = new ServerError();
      expect(Object.getPrototypeOf(error)).toBe(ServerError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });
  });

  describe('ServiceUnavailableError', () => {
    it('should create error with custom message', () => {
      const error = new ServiceUnavailableError('Automate service is down');
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(ServiceUnavailableError);
      expect(error.message).toBe('Automate service is down');
      expect(error.name).toBe('ServiceUnavailableError');
    });

    it('should have default message', () => {
      const error = new ServiceUnavailableError();
      expect(error.message).toBe('Service unavailable');
    });

    it('should have status code 503', () => {
      const error = new ServiceUnavailableError();
      expect(error.statusCode).toBe(503);
    });

    it('should have correct prototype chain', () => {
      const error = new ServiceUnavailableError();
      expect(Object.getPrototypeOf(error)).toBe(ServiceUnavailableError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });
  });

  describe('APIError', () => {
    it('should create error with message and status code', () => {
      const error = new APIError('Rate limit exceeded', 429);
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(TabstackError);
      expect(error).toBeInstanceOf(APIError);
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.statusCode).toBe(429);
      expect(error.name).toBe('APIError');
    });

    it('should accept any status code', () => {
      const error = new APIError('Teapot', 418);
      expect(error.statusCode).toBe(418);
    });

    it('should have correct prototype chain', () => {
      const error = new APIError('Test', 999);
      expect(Object.getPrototypeOf(error)).toBe(APIError.prototype);
      expect(error).toBeInstanceOf(TabstackError);
    });
  });

  describe('Error inheritance and type checking', () => {
    it('should distinguish between different error types', () => {
      const badRequest = new BadRequestError('Bad');
      const unauthorized = new UnauthorizedError('Unauth');
      const serverError = new ServerError('Server');

      expect(badRequest).not.toBeInstanceOf(UnauthorizedError);
      expect(unauthorized).not.toBeInstanceOf(BadRequestError);
      expect(serverError).not.toBeInstanceOf(UnauthorizedError);

      expect(badRequest).toBeInstanceOf(TabstackError);
      expect(unauthorized).toBeInstanceOf(TabstackError);
      expect(serverError).toBeInstanceOf(TabstackError);
    });

    it('should preserve error properties when caught and rethrown', () => {
      try {
        throw new InvalidURLError('Bad URL');
      } catch (error) {
        if (error instanceof InvalidURLError) {
          expect(error.message).toBe('Bad URL');
          expect(error.statusCode).toBe(422);
          expect(error.name).toBe('InvalidURLError');
        } else {
          fail('Error should be InvalidURLError');
        }
      }
    });

    it('should work with instanceof checks in catch blocks', () => {
      const testError = (error: Error) => {
        if (error instanceof BadRequestError) {
          return 'bad-request';
        } else if (error instanceof UnauthorizedError) {
          return 'unauthorized';
        } else if (error instanceof TabstackError) {
          return 'tabstack-error';
        }
        return 'unknown';
      };

      expect(testError(new BadRequestError('test'))).toBe('bad-request');
      expect(testError(new UnauthorizedError('test'))).toBe('unauthorized');
      expect(testError(new ServerError('test'))).toBe('tabstack-error');
      expect(testError(new Error('test'))).toBe('unknown');
    });
  });

  describe('Error stack traces', () => {
    it('should have stack trace', () => {
      const error = new TabstackError('Test');
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('TabstackError');
    });

    it('should have stack trace for derived errors', () => {
      const error = new BadRequestError('Test');
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('BadRequestError');
    });
  });
});
