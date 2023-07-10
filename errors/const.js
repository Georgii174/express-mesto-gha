const messages = {
  common: {
    badId: 'Передан некорректный _id',
    notFound: 'По указанному пути ничего не найдено',
    serverError: 'Ошибка сервера',
  },

  user: {
    notFound: 'Пользователь по указанному _id не найден',
    createBadData: 'Переданы некорректные данные при создании пользователя',
    updateBadData: 'Переданы некорректные данные при обновлении профеля',
    updataWrongFields: 'Переданы некорректные данные при обновлении профеля',
  },

  card: {
    notFound: 'Карточка с указанным _id не найдена',
    badData: 'Переданы некорректные данные при создании карточки',
    delete: 'Карточка успешно удалена',
  },
};

const statusCode = {
  badRequest: 400,
  notFound: 404,
  default: 500,
};

module.exports = { messages, statusCode}