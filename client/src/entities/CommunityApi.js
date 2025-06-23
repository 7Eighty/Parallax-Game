import { axiosInstance } from "../shared/lib/axiosInstance.js";

export default class CommunityApi {
  // Получить все обсуждения
  static async getAllDiscussions() {
    const { data } = await axiosInstance.get("/discussions");
    return data;
  }

  // Получить обсуждение по ID
  static async getDiscussionById(id) {
    const { data } = await axiosInstance.get(`/discussions/${id}`);
    return data;
  }

  // Создать новое обсуждение
  static async createDiscussion(discussionData) {
    const { data } = await axiosInstance.post("/discussions", {
      title: discussionData.title,
      description: discussionData.description,
      image: discussionData.image || null,
    });
    return data;
  }

  // Обновить обсуждение
  static async updateDiscussion(id, discussionData) {
    const { data } = await axiosInstance.put(`/discussions/${id}`, {
      title: discussionData.title,
      description: discussionData.description,
      image: discussionData.image || null,
    });
    return data;
  }

  // Удалить обсуждение
  static async deleteDiscussion(id) {
    const { data } = await axiosInstance.delete(`/discussions/${id}`);
    return data;
  }

  // Поставить лайк обсуждению
  static async likeDiscussion(id) {
    const { data } = await axiosInstance.post(`/discussions/${id}/like`);
    return data;
  }

  // Добавить комментарий к обсуждению
  static async addComment(discussionId, text) {
    const { data } = await axiosInstance.post(
      `/discussions/${discussionId}/comments`,
      {
        text,
      }
    );
    return data;
  }
}
