const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {

  let payload;
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  try {
    payload = jwt.verify(token, 'very-very-very-secret-key');
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  next();
};