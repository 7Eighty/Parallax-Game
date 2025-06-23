const { Discussion, User, Comment } = require("../db/models");

class DiscussionService {
  static async getAllDiscussions() {
    try {
      const discussions = await Discussion.findAll({
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "user_name", "email"],
          },
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "user_name"],
              },
            ],
            order: [["createdAt", "ASC"]],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return discussions;
    } catch (error) {
      console.error("DiscussionService getAllDiscussions error:", error);
      throw new Error("Ошибка при получении обсуждений");
    }
  }

  static async getDiscussionById(id) {
    try {
      const discussion = await Discussion.findByPk(id, {
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "user_name", "email"],
          },
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: User,
                as: "author",
                attributes: ["id", "user_name"],
              },
            ],
            order: [["createdAt", "ASC"]],
          },
        ],
      });
      return discussion;
    } catch (error) {
      console.error("DiscussionService getDiscussionById error:", error);
      throw new Error("Ошибка при получении обсуждения");
    }
  }

  static async createDiscussion(discussionData) {
    try {
      const discussion = await Discussion.create(discussionData);
      return await this.getDiscussionById(discussion.id);
    } catch (error) {
      console.error("DiscussionService createDiscussion error:", error);
      throw new Error("Ошибка при создании обсуждения");
    }
  }

  static async updateDiscussion(id, updateData) {
    try {
      const discussion = await Discussion.findByPk(id);
      if (!discussion) {
        throw new Error("Обсуждение не найдено");
      }
      await discussion.update(updateData);
      return await this.getDiscussionById(id);
    } catch (error) {
      console.error("DiscussionService updateDiscussion error:", error);
      throw new Error("Ошибка при обновлении обсуждения");
    }
  }

  static async deleteDiscussion(id) {
    try {
      const discussion = await Discussion.findByPk(id);
      if (!discussion) {
        throw new Error("Обсуждение не найдено");
      }
      await discussion.destroy();
      return true;
    } catch (error) {
      console.error("DiscussionService deleteDiscussion error:", error);
      throw new Error("Ошибка при удалении обсуждения");
    }
  }

  static async likeDiscussion(id) {
    try {
      const discussion = await Discussion.findByPk(id);
      if (!discussion) {
        throw new Error("Обсуждение не найдено");
      }
      await discussion.increment("likes");
      return await this.getDiscussionById(id);
    } catch (error) {
      console.error("DiscussionService likeDiscussion error:", error);
      throw new Error("Ошибка при добавлении лайка");
    }
  }

  static async addComment(discussionId, commentData) {
    try {
      const discussion = await Discussion.findByPk(discussionId);
      if (!discussion) {
        throw new Error("Обсуждение не найдено");
      }
      const comment = await Comment.create({
        ...commentData,
        discussion_id: discussionId,
      });
      return await this.getDiscussionById(discussionId);
    } catch (error) {
      console.error("DiscussionService addComment error:", error);
      throw new Error("Ошибка при добавлении комментария");
    }
  }
}

module.exports = DiscussionService;
