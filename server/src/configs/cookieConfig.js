const jwtConfig = require("./jwtConfig");

module.exports = {
  access: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 час в миллисекундах
  },
  refresh: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 12, // 12 часов в миллисекундах
  },
};
