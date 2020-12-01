const { celebrate, Joi } = require('celebrate');

const validationRegisterUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле `email` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `email` должно быть заполнено',
        'string.email': 'Поле `email` должно быть корректным email-адресом',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.base': 'Поле `password` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `password` должно быть заполнено',
        'string.min': 'Поле `password` должно содержать минимум 5 символов',
      }),
    name: Joi.string().required().min(2).max(20)
      .messages({
        'string.base': 'Поле `name` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `name` должно быть заполнено',
        'string.min': 'Поле `name` должно содержать минимум 2 символа',
        'string.max': 'Поле `name` должно содержать максимум 20 символов',
      }),
  }),
});

const validationLoginUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.base': 'Поле `email` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `email` должно быть заполнено',
        'string.email': 'Поле `email` должно содержать минимум 2 символа',
      }),
    password: Joi.string().required().min(5)
      .messages({
        'string.base': 'Поле `password` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `password` должно быть заполнено',
        'string.min': 'Поле `password` должно содержать минимум 5 символов',
      }),
  }),
});

const validationArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30)
      .messages({
        'string.base': 'Поле `keyword` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `keyword` должно быть заполнено',
        'string.min': 'Поле `keyword` должно содержать минимум 2 символа',
        'string.max': 'Поле `keyword` должно содержать максимум 30 символов',
      }),
    title: Joi.string().required().min(2).max(100)
      .messages({
        'string.base': 'Поле `title` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `title` должно быть заполнено',
        'string.min': 'Поле `title` должно содержать минимум 2 символа',
        'string.max': 'Поле `title` должно содержать максимум 100 символов',
      }),
    text: Joi.string().required().min(2)
      .messages({
        'string.base': 'Поле `text` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `text` должно быть заполнено',
        'string.min': 'Поле `text` должно содержать минимум 2 символа',
      }),
    date: Joi.string().isoDate()
      .messages({
        'string.base': 'Поле `date` должно быть заполнено типом данных: `Строка`',
        'string.isoDate': 'Поле `date` должно содержать дату создания в формате `ISO 8601`',
      }),
    source: Joi.string().required().min(2)
      .messages({
        'string.base': 'Поле `source` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `source` должно быть заполнено',
        'string.min': 'Поле `source` должно содержать минимум 2 символа',
      }),
    link: Joi.string().uri().required()
      .messages({
        'string.base': 'Поле `link` должно быть заполнено типом данных: `Строка`',
        'string.uri': 'Поле `link` должно быть валидным URl-адресом',
        'string.empty': 'Поле `link` должно быть заполнено',
      }),
    image: Joi.string().uri().required()
      .messages({
        'string.base': 'Поле `image` должно быть заполнено типом данных: `Строка`',
        'string.uri': 'Поле `image` должно быть валидным URl-адресом',
        'string.empty': 'Поле `image` должно быть заполнено',
      }),
  }),
});

const validationParamsId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex()
      .messages({
        'string.base': 'Поле `id` должно быть заполнено типом данных: `Строка`',
        'string.empty': 'Поле `id` должно быть заполнено',
        'string.length': 'Поле `id` должно содержать 24 символа',
        'string.hex': 'Поле `id` должно иметь значение в виде hex-последовательности',
      }),
  }),
});

module.exports = {
  validationRegisterUser,
  validationLoginUser,
  validationArticle,
  validationParamsId,
};
