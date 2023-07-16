const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-perser');
const { errors } = require('celebrate')
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards.js');
const { NotFoundError } = require('./errors/NotFoundError.js');
const { messages } = require('./errors/const.js');
const errors = require('./errors/index.js')
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/users.js');
const { authMiddleware } = require('./middlewares/auth.js');
const { errorsMiddleware, errorMiddleware } = require('./middlewares/error.js');
const { signinCelebrate, signupCelebrate } = require('./validators/users.js')

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
app.use(cookieParser());
app.post('/singup', signupCelebrate, createUser);
app.post('/signin', signinCelebrate, login);

app.use('/users', userRouter.usersRoutes);
app.use('/cards', cardRouter.cardsRoutes);
app.use((req, res, next) => {
  next(new NotFoundError(messages.common.notFound));
});
//app.post('/signup', cardRouter.cardsRoutes);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Запуск сервера`);
});