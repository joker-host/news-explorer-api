const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        keyword: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true,
        },

        text: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        source: {
            type: String,
            required: true,
        },

        link: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    return /^(http|https):\/\/[^ "]+$/.test(value);
                },
                message: (props) => `${props.value} некорректная ссылка`,
            },
        },

        image: {
            type: String,
            required: true,
            validate: {
                validator(value) {
                    return /^(http|https):\/\/[^ "]+$/.test(value);
                },
                message: (props) => `${props.value} некорректная ссылка`,
            },
        },

        owner: {
            type: String,
            // type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            select: false,
        },
    },
    { versionKey: false },
);

module.exports = mongoose.model('article', articleSchema);
