const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const { checkNewCard, checkCardId, } = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', checkNewCard, createCard);
cardsRouter.delete('/:cardId', checkCardId, deleteCard);
cardsRouter.put('/:cardId/likes', checkCardId, like);
cardsRouter.delete('/:cardId/likes', checkCardId, unLike);

module.exports = cardsRouter;