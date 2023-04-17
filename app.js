const express = require('express');
const mongoose = require('mongoose');
const {
  STATUS_NOT_FOUND,
} = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '643d2f4adb4684d520b33ce83',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(STATUS_NOT_FOUND).send({ message: 'Такой страницы не существует :(' });
});

app.listen(PORT, () => {
});


console.log("1488");