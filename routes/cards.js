const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const { validationCard, validationCardId  } = require('../middlewares/validation');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCard, createCard);
cardsRouter.delete('/:cardId', validationCardId , deleteCard);
cardsRouter.put('/:cardId/likes', validationCardId , like);
cardsRouter.delete('/:cardId/likes', validationCardId , unLike);

module.exports = cardsRouter;