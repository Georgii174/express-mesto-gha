const statusCode = require('./const.js');

class NotFoundError extends Error {
  constructor(message){
    this.name = 'NotFoundError';
    this.statusCode = statusCode.NotFound;
  }

  static sandError({ res, message}) {
    res.status(statusCode.NotFound).send({ message});
  }
}

module.exports = { NotFoundError }