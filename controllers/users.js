const User = require('../models/users.js');
const { handleDefaultError, NotFoundError, BadRequestError } = require('../errors/index.js');
const { messages } = require('../errors/const.js');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        BadRequestError
          .sendError({ res, message: messages.user.createBadData });
        return;
      }
      handleDefaultError(res);
    });
};

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.send(users))
  .catch(() => handleDefaultError(res));
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((user) =>
    res.send(user)
  )
  .catch((error) => {
    if(error instanceof NotFoundError) {
      NotFoundError
      .sandError({res, message: messages.user.notFound});
      return;
    }
    if(error.name === 'CastError') {
      BadRequestError
      .sendError({res, message: messages.common.badId});
      return;
    }
    handleDefaultError(res);
  });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about, avatar},
    { new: true, runValidators: true},
    )
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((user) =>
    res.send(user)
  )
  .catch((error) => {
    if(error instanceof NotFoundError) {
      NotFoundError
      .sandError({res, message: messages.user.notFound});
      return;
    }
    if(error.name === 'CastError') {
      BadRequestError
      .sendError({res, message: messages.common.badId});
      return;
    }
    if (error.name === 'ValidationError') {
      BadRequestError
        .sendError({ res, message: messages.user.updateBadData });
      return;
    }
    handleDefaultError(res);
  });
};

module.exports = {
  createUser, getUsers, getUserById, updateUser,
}