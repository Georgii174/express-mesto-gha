const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const { NotFoundError } = require('./errors/NotFoundError.js');
const { messages } = require('./errors/const.js');
const errors = require('./errors/index.js')
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(() => {
  console.log('Connected!')
})
.catch((error) => {
  console.log('No Connected!', error)
})
;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64a96d28c028d5a5562a0556' // вставьте сюда _id созданного в предыдущем пункте пользователя
    // _id: '64ac553b7753eda24a29d65d' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', userRouter.usersRoutes);
app.use('/cards', cardRouter.cardsRoutes);
// app.post('/signup', cardRouter.cardsRoutes);
app.use((req, res, next) => {
  next(new NotFoundError(messages.common.notFound));
});
app.use(errors.handleDefaultError);


app.listen(PORT, () => {
    console.log(`Запуск сервера`);
});
