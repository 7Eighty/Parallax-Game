const { Discussion, User, Comment, Like } = require("../db/models");

class DiscussionService {
  static async getAllDiscussions(userId = null) {
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
          {
            model: Like,
            as: "likes",
            attributes: ["user_id"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      // enrich with likes count and liked
      // ЛОГИРУЕМ userId и лайки для каждого обсуждения
      discussions.forEach((discussion) => {
        console.log(
          `discussion.id=${discussion.id}, userId=${userId}, likes=`,
          discussion.likes ? discussion.likes.map((l) => l.user_id) : []
        );
      });
      return discussions.map((discussion) => {
        const likes = discussion.likes ? discussion.likes.length : 0;
        const liked = userId
          ? discussion.likes.some((like) => like.user_id === userId)
          : false;
        return {
          ...discussion.toJSON(),
          likes,
          liked,
        };
      });
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

  static async toggleLike(discussionId, userId) {
    const discussion = await Discussion.findByPk(discussionId);
    if (!discussion) {
      throw new Error("Обсуждение не найдено");
    }
    const existingLike = await Like.findOne({
      where: { discussion_id: discussionId, user_id: userId },
    });
    let liked;
    if (existingLike) {
      await existingLike.destroy();
      liked = false;
    } else {
      await Like.create({ discussion_id: discussionId, user_id: userId });
      liked = true;
    }
    // Считаем количество лайков
    const likesCount = await Like.count({
      where: { discussion_id: discussionId },
    });
    return { likes: likesCount, liked };
  }
}

module.exports = DiscussionService;
