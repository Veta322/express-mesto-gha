const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  like,
  unLike,
} = require('../controllers/cards');
const { validateCard, validateCardId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, like);
router.delete('/:cardId/likes', validateCardId, unLike);

module.exports = router;