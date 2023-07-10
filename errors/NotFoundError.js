const statuses = require('./const.js');

class NotFoundError extends Error {
  constructor(message){
    this.name = 'NotFoundError';
    this.statusCode = statusCode.NotFound;
  }

  static sandError({ res, message}) {
    res.status(statuses.statusCode.NotFound).send({ message});
  }
}

module.exports = { NotFoundError }