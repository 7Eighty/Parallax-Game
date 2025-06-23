const router = require("express").Router();

const DiscussionController = require("../controllers/Discussion.controller");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

router
  .get("/", DiscussionController.getAllDiscussions)
  .get("/:id", DiscussionController.getDiscussionById)
  .post("/", verifyAccessToken, DiscussionController.createDiscussion)
  .put("/:id", verifyAccessToken, DiscussionController.updateDiscussion)
  .delete("/:id", verifyAccessToken, DiscussionController.deleteDiscussion)
  .post("/:id/like", DiscussionController.likeDiscussion)
  .post(
    "/:discussionId/comments",
    verifyAccessToken,
    DiscussionController.addComment
  );

module.exports = router;
