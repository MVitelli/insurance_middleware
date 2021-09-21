class ApiError extends Error {
  constructor(status, code, message) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message || "Something went wrong. Please try again.";

    this.status = status || 500;

    this.code = code;
  }
}

export default ApiError;
