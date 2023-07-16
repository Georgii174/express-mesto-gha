const { statuses } = require('./const');

class UnauthorizedError extends Error {
  constructor(message){
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = statuses.statusCode.unauthorized;
  }
}

module.exports = { UnauthorizedError }