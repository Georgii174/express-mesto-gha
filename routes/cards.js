const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

const router = express.Router();

router.get('/', getCards);
router.post('/', createCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId', deleteCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = {
  cardsRoutes: router
}