const apiRouter = require('express').Router();
const auth = require('../middlewares/auth');
const checkPassword = require('../middlewares/checkPassword');

const {
  createUser,
  userAuth,
  getUserInfo,
} = require('../controllers/users');

const {
  getArticlesById,
  createArticle,
  deleteArticle,
} = require('../controllers/article');

const {
  validationRegisterUser,
  validationLoginUser,
  validationArticle,
  validationParamsId,
} = require('../middlewares/requestValidation');

apiRouter.post('/signin', validationLoginUser, checkPassword, userAuth); //
apiRouter.post('/signup', validationRegisterUser, checkPassword, createUser); //

apiRouter.get('/users/me', auth, getUserInfo); //

apiRouter.get('/articles', auth, getArticlesById); //
apiRouter.post('/articles', validationArticle, auth, createArticle); //
apiRouter.delete('/articles/:articleId', validationParamsId, auth, deleteArticle); //

module.exports = {
  apiRouter,
};
