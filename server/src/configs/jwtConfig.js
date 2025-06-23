module.exports = {
  access: {
    expiresIn: "1h", // * время жизни access токена, 1 час для тестирования
  },
  refresh: {
    expiresIn: "12h", // * время жизни refresh токена,  живёт долго, хранит инфу об юзере
  },
};
