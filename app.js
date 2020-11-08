const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/apiRouter');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(cors());

mongoose.connect('mongodb://localhost:27017/diplomadb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', apiRouter);

app.use(errorLogger);

app.use(errors());

app.use(() => {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
});


app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message || 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
    console.log(`Мы слушаем на порту ${PORT}`);
});
