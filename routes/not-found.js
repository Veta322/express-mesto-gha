const router = require('express').Router();
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/auth').default;

router.all('*', auth, () => {
  throw new NotFoundError('Такой страницы не существует =(');
});

module.exports = router;
