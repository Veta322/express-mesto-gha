const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/routes');

const {
  PORT = 3000,
} = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const errorMessage = statusCode === 500 ? 'На сервере произошла ошибка' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
});
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });

app.listen(PORT, () => {});
