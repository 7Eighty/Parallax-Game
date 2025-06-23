const DiscussionService = require("../services/Discussion.service");
const { formatResponse } = require("../utils/formatResponse");

class DiscussionController {
  static async getAllDiscussions(req, res) {
    try {
      const discussions = await DiscussionService.getAllDiscussions();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Обсуждения успешно получены",
          data: discussions,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить обсуждения",
          error: error.message,
        })
      );
    }
  }

  static async getDiscussionById(req, res) {
    try {
      const { id } = req.params;
      const discussion = await DiscussionService.getDiscussionById(id);

      if (!discussion) {
        res.status(404).json(
          formatResponse({
            statusCode: 404,
            message: "Обсуждение не найдено",
            error: "Обсуждение не найдено",
          })
        );
      } else {
        res.status(200).json(
          formatResponse({
            statusCode: 200,
            message: "Обсуждение успешно получено",
            data: discussion,
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить обсуждение",
          error: error.message,
        })
      );
    }
  }

  static async createDiscussion(req, res) {
    try {
      const { title, description, image } = req.body;
      const { user } = res.locals;

      if (!title || !description) {
        res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Заголовок и описание обязательны",
            error: "Заголовок и описание обязательны",
          })
        );
      } else {
        const discussion = await DiscussionService.createDiscussion({
          title,
          description,
          image: image || null,
          author_id: user.id,
        });

        res.status(201).json(
          formatResponse({
            statusCode: 201,
            message: "Обсуждение успешно создано",
            data: discussion,
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось создать обсуждение",
          error: error.message,
        })
      );
    }
  }

  static async updateDiscussion(req, res) {
    try {
      const { id } = req.params;
      const { title, description, image } = req.body;
      const { user } = res.locals;

      const discussion = await DiscussionService.getDiscussionById(id);

      if (!discussion) {
        res.status(404).json(
          formatResponse({
            statusCode: 404,
            message: "Обсуждение не найдено",
            error: "Обсуждение не найдено",
          })
        );
      } else if (discussion.author_id !== user.id) {
        res.status(403).json(
          formatResponse({
            statusCode: 403,
            message: "Нет прав для редактирования этого обсуждения",
            error: "Нет прав для редактирования этого обсуждения",
          })
        );
      } else {
        const updatedDiscussion = await DiscussionService.updateDiscussion(id, {
          title,
          description,
          image: image || null,
        });

        res.status(200).json(
          formatResponse({
            statusCode: 200,
            message: "Обсуждение успешно обновлено",
            data: updatedDiscussion,
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось обновить обсуждение",
          error: error.message,
        })
      );
    }
  }

  static async deleteDiscussion(req, res) {
    try {
      const { id } = req.params;
      const { user } = res.locals;

      const discussion = await DiscussionService.getDiscussionById(id);

      if (!discussion) {
        res.status(404).json(
          formatResponse({
            statusCode: 404,
            message: "Обсуждение не найдено",
            error: "Обсуждение не найдено",
          })
        );
      } else if (discussion.author_id !== user.id) {
        res.status(403).json(
          formatResponse({
            statusCode: 403,
            message: "Нет прав для удаления этого обсуждения",
            error: "Нет прав для удаления этого обсуждения",
          })
        );
      } else {
        await DiscussionService.deleteDiscussion(id);
        res.status(200).json(
          formatResponse({
            statusCode: 200,
            message: "Обсуждение успешно удалено",
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось удалить обсуждение",
          error: error.message,
        })
      );
    }
  }

  static async likeDiscussion(req, res) {
    try {
      const { id } = req.params;
      const discussion = await DiscussionService.likeDiscussion(id);

      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Лайк успешно добавлен",
          data: discussion,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось добавить лайк",
          error: error.message,
        })
      );
    }
  }

  static async addComment(req, res) {
    try {
      const { discussionId } = req.params;
      const { text } = req.body;
      const { user } = res.locals;

      if (!text) {
        res.status(400).json(
          formatResponse({
            statusCode: 400,
            message: "Текст комментария обязателен",
            error: "Текст комментария обязателен",
          })
        );
      } else {
        const discussion = await DiscussionService.addComment(discussionId, {
          text,
          author_id: user.id,
        });

        res.status(201).json(
          formatResponse({
            statusCode: 201,
            message: "Комментарий успешно добавлен",
            data: discussion,
          })
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось добавить комментарий",
          error: error.message,
        })
      );
    }
  }
}

module.exports = DiscussionController;
