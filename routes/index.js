const { errors } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validationLogin, validationCreateUser  } = require('../middlewares/validation');
const  handleError  = require('../middlewares/handleError');
const NotFound = require('../utils/errors/NotFound');

routes.post('/signin', validationLogin, login);
routes.post('/signup', validationCreateUser, createUser);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.all('*', (req, res, next) => { next(new NotFound('Запрашиваемый адрес не найден :( ')); });

routes.use(errors());

routes.use(handleError);

module.exports = { routes };
