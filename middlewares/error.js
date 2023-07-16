const { messages, statuses } = require('../errors/const.js');

const errorMiddleware = (error, req, res, next) => {
  const { statusCode = 500, messge = ''} = error;

  if (error.code === 11000) {
    res.status(statuses.conflict).send({ messge: messages.user.conflictEmail });
    return;
  }
  res.status(statusCode).send({ messge });
  next();
};

module.exports = { errorMiddleware };