const statuses = require('./const.js');

class NotFoundError extends Error {
  constructor(message){
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = statuses.statusCode.notFound;
  }

  static sandError({ res, message}) {
    res.status(statuses.statusCode.notFound).send({ message});
  }
}

module.exports = { NotFoundError }