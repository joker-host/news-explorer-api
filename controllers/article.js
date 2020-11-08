const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getArticlesById = (req, res, next) => {
    Article.find({ owner: req.user.id })
        .orFail(new UnauthorizedError('Необходимо авторизоваться'))
        .then((data) => res.status(200).send(data))
        .catch(next);
}

const createArticle = (req, res, next) => {
    const _id = req.user.id;

    return Article.create({
        keyword: req.body.keyword,
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        source: req.body.source,
        link: req.body.link,
        image: req.body.image,
        owner: _id
    })
        .then((article) => {
            if (!article) {
                next(new BadRequestError('Переданы некорректные данные'));
            }
            res.status(201).send(article)
        })
        .catch(next);
}

const deleteArticle = (req, res, next) => {
    Article.findOneAndDelete({ _id: req.params.articleId })
        .orFail(new NotFoundError('Статья не найдена'))
        .then(() => res.status(200).send({ message: `Статья ${req.params.articleId} удалена` }))
        .catch(next);
}

module.exports = {
    getArticlesById,
    createArticle,
    deleteArticle
};