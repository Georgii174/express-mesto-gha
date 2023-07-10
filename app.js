const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const NotFoundError = require('./errors/NotFoundError.js');
const messages = require('./errors/const.js');
const createUser = require('./controllers/users.js');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use('/users', userRouter);
app.use('/cards', createUser);
app.post('/signup', createUser);
app.use((req, res, next) => {
  next(new NotFoundError(messages.common.notFound));
});
app.use(errors());
app.use((req, res, next) => {
  req.user = {
    _id: '64a96d28c028d5a5562a0556' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
    console.log(`Запуск сервера`);
});
