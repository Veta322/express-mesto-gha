const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Unauthorized = require('../utils/errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Валерочка',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь гаража',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://d7-invdn-com.investing.com/company_logo/ece7f24263c337cd82511463b9ec5b4d.jpg',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);