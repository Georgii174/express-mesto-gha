const { messages, statusCodes } = require('../errors/const.js');

const errorMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message: message = ''} = error;

  if (error.code === 11000) {
    res.status(statusCodes.conflict).send({ message: messages.user.conflictEmail });
    return;
  }
  res.status(statusCode).send({ message: message });
  next();
};

module.exports = { errorMiddleware };
