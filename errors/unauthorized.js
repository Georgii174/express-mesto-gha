const { statusCode } = require('./const');

class UnauthorizedError extends Error {
  constructor(message){
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statusCode.unauthorized;
  }
}

module.exports = { UnauthorizedError }
