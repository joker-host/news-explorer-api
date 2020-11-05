const apiRouter = require('express').Router();
const auth = require('../middlewares/auth');

const {
    createUser,
    userAuth,
    getUserInfo
} = require('../controllers/users');

apiRouter.post('/signin', userAuth);
apiRouter.post('/signup', createUser);

apiRouter.get('/users/me', auth, getUserInfo);

apiRouter.get('/articles', auth);
apiRouter.post('/articles', auth);
apiRouter.delete('/article/articleId', auth);

module.exports = {
    apiRouter,
};