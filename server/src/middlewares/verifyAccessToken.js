const jwt = require("jsonwebtoken");
const UserService = require("../services/User.service");

const { formatResponse } = require("../utils/formatResponse");

const { SECRET_ACCESS_TOKEN } = process.env;

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        statusCode: 401,
        message: "Access token не предоставлен",
        error: "Access token не предоставлен",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: "Access token не предоставлен",
        error: "Access token не предоставлен",
      });
    }

    const decoded = jwt.verify(token, SECRET_ACCESS_TOKEN);
    const user = await UserService.getById(decoded.user.id);

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Пользователь не найден",
        error: "Пользователь не найден",
      });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log("Access token verification error:", error);
    return res.status(401).json({
      statusCode: 401,
      message: "Недействительный access token",
      error: "Недействительный access token",
    });
  }
};

module.exports = verifyAccessToken;
