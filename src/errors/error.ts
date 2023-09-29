
type errorType = "validation" | "internal" | "notFound" | 'auth';

export interface ErrorType extends Error {
    errorType : string
}

export class ValidationError extends Error {
    errorType:errorType
    constructor(message: string | undefined) {
      super(message);
      this.name = "ValidationError";
      this.errorType = "validation"
    }
  }

  export class InternalError extends Error {
    errorType:errorType
    constructor(message: string | undefined) {
      super(message);
      this.name = "InternalError";
      this.errorType = "internal"
    }
  }

  export class NotFoundError extends Error {
    errorType:errorType
    constructor(message: string | undefined) {
      super(message);
      this.name = "NotFoundError";
      this.errorType = "notFound"
    }
  }

  export class NotAuthorizedError extends Error {
    errorType:errorType
    constructor(message: string | undefined) {
      super(message);
      this.name = "NotAuthorizedError";
      this.errorType = "auth"
    }
  }