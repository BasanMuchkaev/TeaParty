const express = require('express');

const port = process.env.PORT || 3000; // задаем порт
const app = express(); // инициализируем express
const path = require('path'); // Устанавливаем метод склеивания путей
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const hbs = require('hbs');
const fetch = require('node-fetch');

const { Op } = require('sequelize');
const teapitieRouter = require('./routes/teapitie.router');

const indexRouter = require('./routes/index');
const regRouter = require('./routes/registr.router');
const authRouter = require('./routes/auth.router');
const logOut = require('./routes/logout.router');
const lkRouter = require('./routes/lk.router');

app.use(express.static(path.join(process.env.PWD, 'public'))); // Скливает путь до общей дериктории
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); // Утснавливаем зависимость с HBS
// для того, чтобы использовать partials
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

app.use(express.urlencoded({ extended: true })); // чтобы парсить формs
app.use(express.json()); // чтобы парсить json

// Отрисовка

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test', // Секретное слово для шифрования, может быть
  store: new FileStore(),
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  app.locals.userName = req.session?.name;
  app.locals.admin = req.session?.admin;
  next();
});

app.get('/', (req, res) => {
  res.render('main');
});

app.use('/logout', logOut);
app.use('/registr', regRouter);
app.use('/auth', authRouter);
app.use('/teapitie', teapitieRouter);
app.use('/lk', lkRouter);
app.use('/tea', indexRouter);

app.listen(port, () => {
  console.log(`Server has been sterted on port ${port}`);
});
