const express = require('express');
const morgan = require('morgan');

const path = require('path')

const cors = require('cors')

const removeXPoweredBy = require('../middlewares/removeHeader')

const indexRouter = require('../routes/index.router')

// * Подключаем cookie-parser
const cookieParser = require('cookie-parser');


const corsOptions = {
  origin: [process.env.CLIENT_URL],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // * Мы передаём куки на клиент 
}

const serverConfig = (app) => {
  // * Подключаем CORS
  app.use(cors(corsOptions))

  app.use(express.urlencoded({ extended: true }));
  // * express.json() - чтобы отправлять данные из postman в json тело
  app.use(express.json());
  // Подключение Morgan
  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname, '../../public')))

  // * Чтение куки-файлов
  app.use(cookieParser());

  // * Подключение самописной мидлварки
  app.use(removeXPoweredBy)

  app.use('/api', indexRouter)

}

module.exports = serverConfig
