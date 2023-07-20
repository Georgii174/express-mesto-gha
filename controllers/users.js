const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const { handleDefaultError, NotFoundError, BadRequestError } = require('../errors/index.js');
const { UnauthorizedError } = require('../errors/unauthorized.js');
const { messages } = require('../errors/const.js');
const { JWT_SECRET } = require('../envConfig.js');

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash, }))
    .then((user) => {
      const { _id, name, about, avatar, email, } = user;
      res.send({ _id, name, about, avatar, email, });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) =>
      res.send(user)
    )
    .catch(next);
};

const getCurrentUser = async (req, res, next) => {
  const userId = req?.user?._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(messages.user.notFound);
    })
    .then((user) =>
    res.send(user)
    )
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) =>
      res.send(user)
    )
    .catch(next);
};

const login = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(messages.user.loginBadData);
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.user.loginBadData);
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            });
          res.send({ message: messages.common.authorized });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser, getUsers, getUserById, updateUser, login, getCurrentUser
}
