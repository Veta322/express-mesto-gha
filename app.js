const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const { validationLogin, validationCreateUser  } = require('./middlewares/validation');


const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден.',
  });
});
app.use(errors());
app.use(handleError);

app.listen(PORT);

