const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const { validationCard, validationCardId  } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validationCard, createCard);
cardsRouter.delete('/cards/:cardId', validationCardId , deleteCard);
cardsRouter.put('/cards/:cardId/likes', validationCardId , like);
cardsRouter.delete('/cards/:cardId/likes', validationCardId , unLike);

module.exports = cardsRouter;