const Card = require('../models/card');
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_BAD_REQUEST_MESSAGE,
  STATUS_NOT_FOUND_MESSAGE,
  STATUS_INTERNAL_SERVER_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
      }
      return res.send(cards);
    })
    .catch(() => res.status(STATUS_INTERNAL_SERVER_ERROR)
      .send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE));
};

module.exports.createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
    });
};

module.exports.like = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавим _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      if (error.name === 'CastError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
    });
};

module.exports.unLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // уберем _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_NOT_FOUND).send(STATUS_NOT_FOUND_MESSAGE);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      if (error.name === 'CastError') {
        return res.status(STATUS_BAD_REQUEST).send(STATUS_BAD_REQUEST_MESSAGE);
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send(STATUS_INTERNAL_SERVER_ERROR_MESSAGE);
    });
};
