const router = require("express").Router();

const DiscussionController = require("../controllers/Discussion.controller");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

// Опциональная авторизация: если есть токен — проверяем, если нет — идём дальше
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return verifyAccessToken(req, res, next);
  }
  next();
};

router
  .get("/", optionalAuth, DiscussionController.getAllDiscussions)
  .get("/:id", DiscussionController.getDiscussionById)
  .post("/", verifyAccessToken, DiscussionController.createDiscussion)
  .put("/:id", verifyAccessToken, DiscussionController.updateDiscussion)
  .delete("/:id", verifyAccessToken, DiscussionController.deleteDiscussion)
  .post("/:id/like", verifyAccessToken, DiscussionController.likeDiscussion)
  .post(
    "/:discussionId/comments",
    verifyAccessToken,
    DiscussionController.addComment
  );

module.exports = router;
