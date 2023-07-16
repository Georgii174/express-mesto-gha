const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized.js');
const { JWT_SECRT } = require('../envConfig.js');

const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRT);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
}

module.exports = { authMiddleware }