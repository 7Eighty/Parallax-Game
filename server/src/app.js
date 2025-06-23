require('dotenv').config()

const express = require('express');
const app = express();

const serverConfig = require('./configs/serverConfig')

const { PORT } = process.env

serverConfig(app)

// ! Всегда вконце
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
