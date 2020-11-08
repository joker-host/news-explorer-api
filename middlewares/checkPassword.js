const BadRequestError = require('../errors/BadRequestError');

const checkPassword = (req, res, next) => {
    const { password } = req.body;

    if(!password || !password.trim() || !(password.trim().length >= 5)) {
        next(new BadRequestError('Поле `password` должно быть заполнено и содержать 5 и более символов'));
    } else {
        next();
    }
}

module.exports = checkPassword;