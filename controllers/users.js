const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const { JWT_SECRET, NODE_ENV } = process.env;

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10, (hash) => {
    User.findOne({ email })
      .then((user) => {
        if (user) return next(new ConflictError('Такой пользователь уже существует'));
        return User.create({ email, password: hash, name })
          .then((newUser) => res
            .status(200)
            .send({ success: true, message: `Пользователь ${newUser.email} успешно создан` }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
            } else {
              next(err);
            }
          });
      })
      .catch(next);
  });
};

const userAuth = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        return next(new UnauthorizedError('Такого пользователя не существует'));
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(new UnauthorizedError('Не правильный логин или пароль'));
      }
      const token = jwt.sign(
        { id: user.id },
        `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`,
        { expiresIn: '7d' },
      );
      return res.status(200).send({ token });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  createUser,
  userAuth,
  getUserInfo,
};
