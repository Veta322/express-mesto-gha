const unauthorizedUser = 'Авторизация не пройдена =(';

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = { UnauthorizedError, unauthorizedUser };
