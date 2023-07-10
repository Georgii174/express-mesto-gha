const { messages, statusCode } = require('./const.js');
const BadRequestError = require('./badReques.js');
const NotFoundError = require('./NotFoundError.js');

const handleDefaultError = (res) => {
  res.status(statusCode.default).send({message: messages.common.serverError});
};

module.exports = {handleDefaultError, NotFoundError, BadRequestError};