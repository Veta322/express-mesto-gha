const { celebrate, Joi } = require('celebrate');
const pattern = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(pattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateAvarar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(pattern).required(),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(pattern).required(),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});