const { errors } = require('celebrate');
const routes = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateRegister, validateLogin } = require('../utils/validators');
const { errorHandler } = require('../middlewares/errorHandler');
const NotFound = require('../utils/errors/NotFound');

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateRegister, createUser);

routes.use(auth);

routes.use('/users', require('./users'));
routes.use('/cards', require('./cards'));

routes.all('*', (req, res, next) => { next(new NotFound('Несуществующий маршрут.')); });

routes.use(errors());

routes.use(errorHandler);

module.exports = { routes };