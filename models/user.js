const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator(v) {
                    return /.+@.+\..+/i.test(v);
                },
                message: (props) => `${props.value} не корректный Email`,
            },
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30,
        },
    },
    { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);