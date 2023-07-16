const express = require("express");
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();

const corsOptions = {
  origin: '*', // Разрешить доступ со всех источников
};
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(require('./routes'))

const { MONGOOSE_URL, PORT } = process.env;
const connectWithMongooseAndServer = async () => {
  try {
    await mongoose.connect(MONGOOSE_URL);
    app.listen(PORT, () => console.log('Подключено к серверу, порт: ' + PORT));
  } catch (error) {
    console.log('Ошибка при подключении: ' + error.toString());
  }
};
//todo
connectWithMongooseAndServer();
