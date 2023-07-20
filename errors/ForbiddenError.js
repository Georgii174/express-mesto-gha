const statuses = require('./const.js');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = statuses.statusCodes.forbidden;
  }
}

module.exports = { ForbiddenError }
