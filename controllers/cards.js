const Card = require('../models/cards.js');
const { handleDefaultError, NotFoundError, BadRequestError } = require('../errors/index.js');
const { messages } = require('../errors/const.js');

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        BadRequestError
          .sendError({ res, message: messages.card.badData });
        return;
      }
      handleDefaultError(res);
    });
};

const getCards = (req, res) => {
  Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => handleDefaultError(res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
  .orFail(() => {
    throw new NotFoundError();
  })
  .then(() => {
    res.send({message: messages.card.delete});
  })
  .catch((error) => {
    if(error instanceof NotFoundError) {
      NotFoundError
      .sandError({res, message: messages.card.notFound});
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

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $addToset: {likes: req.user._id}},
    { new: true },
    )
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((card) => {
    res.send(card);
  })
  .catch((error) => {
    if(error instanceof NotFoundError) {
      NotFoundError
      .sandError({res, message: messages.card.notFound});
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

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId,
    { $pull: {likes: req.user._id}},
    { new: true },
    )
  .orFail(() => {
    throw new NotFoundError();
  })
  .then((card) => {
    res.send(card);
  })
  .catch((error) => {
    if(error instanceof NotFoundError) {
      NotFoundError
      .sandError({res, message: messages.card.notFound});
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

module.exports = {
  createCard, getCards, deleteCard, likeCard, dislikeCard
}