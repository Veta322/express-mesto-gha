const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_OK,
  STATUS_CREATED,
} = require('../utils/constants');
const { BadRequestError, badRequestMessage } = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { NotFoundError, notFoundUser } = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_OK).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if (data === null) {
        throw new NotFoundError(notFoundUser);
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          badRequestMessage,
        ));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          const { _id } = user;
          res.status(STATUS_CREATED).send({
            _id, email, name, about, avatar,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(
              badRequestMessage,
            ));
          } else if (err.code === 11000) {
            next(new ConflictError(
              'Пользователь с таким email уже существует',
            ));
          } else {
            next(err);
          }
        });
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError(notFoundUser);
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          badRequestMessage,
        ));
      } else {
        next(err);
      }
    });
};

module.exports.updateInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (data === null) {
        throw new NotFoundError(notFoundUser);
      } else {
        res.status(STATUS_OK).send({ data });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          badRequestMessage,
        ));
      } else {
        next(err);
      }
    });
};

module.exports.getInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'very-very-very-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
