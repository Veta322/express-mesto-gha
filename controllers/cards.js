const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Не получилось создать карточку =('));
    } else {
      next(err);
    }
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      throw new NotFoundError('Карточка не найдена =(');
    }

    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Упс =( Чужая фотокарточка');
    }

    await Card.findByIdAndDelete(req.params.id);

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Что-то пошло не так =( Данные некорректны.'));
    } else {
      next(err);
    }
  }
};

const handleCardLike = async (req, res, next) => {
  try {
    let action;

    if (req.method === 'PUT') {
      action = '$addToSet';
    }

    if (req.method === 'DELETE') {
      action = '$pull';
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { [action]: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError('Такой карточки не существует =(');
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Что-то пошло не так =( Данные некорректны.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  handleCardLike,
};