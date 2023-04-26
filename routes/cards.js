const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const auth = require('../middlewares/auth').default;
const {
  checkNewCard, checkCardId,
} = require('../utils/validation');

router.get('/cards', auth, getCards);
router.post('/cards', auth, checkNewCard, createCard);
router.delete('/cards/:cardId', auth, checkCardId, deleteCard);
router.put('/cards/:cardId/likes', auth, checkCardId, like);
router.delete('/cards/:cardId/likes', auth, checkCardId, unLike);

module.exports = router;
