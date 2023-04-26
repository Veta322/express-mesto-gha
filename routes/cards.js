const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const { validateCard, validateCardId } = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCard, createCard);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardId, like);
cardsRouter.delete('/:cardId/likes', validateCardId, unLike);

module.exports = cardsRouter;