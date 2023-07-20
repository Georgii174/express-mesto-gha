const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized.js');
const { JWT_SECERT } = require('../envConfig.js');

const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (req.url.includes('signin')) {
    next();
    return
  }

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
}

module.exports = { authMiddleware }
