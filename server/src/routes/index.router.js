const indexRouter = require("express").Router();
const authRouter = require("./auth.router");
const discussionRouter = require("./discussion.router");

indexRouter.use("/auth", authRouter);
indexRouter.use("/discussions", discussionRouter);

indexRouter.use((req, res) => {
  res.status(404).send("Страница не найдена");
});

module.exports = indexRouter;
