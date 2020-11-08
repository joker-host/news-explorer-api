const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Поле `email` должно быть заполнено'],
            unique: true,
            validate: {
                validator: (email) => validator.isEmail(email),
                message: 'Поле "link" должно быть валидным url-адресом',
            },
        },

        password: {
            type: String,
            required: [true, 'Поле `password` должно быть заполнено'],
            minlength: [5, 'Поле `password` должно содержать 5 символов или больше'],
            select: false,
        },

        name: {
            type: String,
            required: [true, 'Поле `name` должно быть заполнено'],
            minlength: [2, 'Поле `name` должно содержать от 2 до 30 символов'],
            maxlength: [30, 'Поле `name` должно содержать от 2 до 30 символов'],
        },
    },
    { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);