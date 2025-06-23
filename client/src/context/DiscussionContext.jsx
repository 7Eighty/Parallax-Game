import React, { createContext, useContext, useState, useEffect } from "react";
import CommunityApi from "../entities/CommunityApi.js";
import { useAuth } from "./AuthContext.jsx";

const DiscussionContext = createContext(undefined);

export const useDiscussions = () => {
  const context = useContext(DiscussionContext);
  if (context === undefined) {
    throw new Error("useDiscussions must be used within a DiscussionProvider");
  }
  return context;
};

export const DiscussionProvider = ({ children }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLikes, setUserLikes] = useState(new Set()); // Отслеживаем лайки пользователя
  const { user } = useAuth();

  // Загружаем обсуждения при монтировании компонента
  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CommunityApi.getAllDiscussions();
      if (response.statusCode === 200) {
        setDiscussions(response.data);
      } else {
        setError(response.message || "Ошибка при загрузке обсуждений");
      }
    } catch (err) {
      console.error("Error loading discussions:", err);
      setError("Не удалось загрузить обсуждений");
    } finally {
      setLoading(false);
    }
  };

  const addDiscussion = async (discussionData) => {
    try {
      const response = await CommunityApi.createDiscussion(discussionData);
      if (response.statusCode === 201) {
        // Обновляем список обсуждений
        await loadDiscussions();
        return true;
      } else {
        setError(response.message || "Ошибка при создании обсуждения");
        return false;
      }
    } catch (err) {
      console.error("Error creating discussion:", err);
      setError("Не удалось создать обсуждение");
      return false;
    }
  };

  const updateDiscussion = async (id, updates) => {
    try {
      const response = await CommunityApi.updateDiscussion(id, updates);
      if (response.statusCode === 200) {
        // Обновляем список обсуждений
        await loadDiscussions();
        return true;
      } else {
        setError(response.message || "Ошибка при обновлении обсуждения");
        return false;
      }
    } catch (err) {
      console.error("Error updating discussion:", err);
      setError("Не удалось обновить обсуждение");
      return false;
    }
  };

  const deleteDiscussion = async (id) => {
    try {
      const response = await CommunityApi.deleteDiscussion(id);
      if (response.statusCode === 200) {
        // Обновляем список обсуждений
        await loadDiscussions();
        return true;
      } else {
        setError(response.message || "Ошибка при удалении обсуждения");
        return false;
      }
    } catch (err) {
      console.error("Error deleting discussion:", err);
      setError("Не удалось удалить обсуждение");
      return false;
    }
  };

  const likeDiscussion = async (id) => {
    if (!user) {
      setError("Необходимо войти в систему для постановки лайка");
      return false;
    }

    try {
      // Проверяем, есть ли уже лайк от пользователя
      const hasLiked = userLikes.has(id);

      if (hasLiked) {
        // Если лайк уже есть, убираем его
        setUserLikes((prev) => {
          const newLikes = new Set(prev);
          newLikes.delete(id);
          return newLikes;
        });

        // Обновляем количество лайков в обсуждении
        setDiscussions((prev) =>
          prev.map((discussion) =>
            discussion.id === id
              ? { ...discussion, likes: Math.max(0, discussion.likes - 1) }
              : discussion
          )
        );
      } else {
        // Если лайка нет, добавляем его
        setUserLikes((prev) => new Set(prev).add(id));

        // Обновляем количество лайков в обсуждении
        setDiscussions((prev) =>
          prev.map((discussion) =>
            discussion.id === id
              ? { ...discussion, likes: discussion.likes + 1 }
              : discussion
          )
        );
      }

      // Отправляем запрос на сервер (опционально, для синхронизации)
      try {
        await CommunityApi.likeDiscussion(id);
      } catch (serverError) {
        console.error("Server sync error:", serverError);
        // Если сервер недоступен, откатываем изменения
        if (hasLiked) {
          setUserLikes((prev) => new Set(prev).add(id));
          setDiscussions((prev) =>
            prev.map((discussion) =>
              discussion.id === id
                ? { ...discussion, likes: discussion.likes + 1 }
                : discussion
            )
          );
        } else {
          setUserLikes((prev) => {
            const newLikes = new Set(prev);
            newLikes.delete(id);
            return newLikes;
          });
          setDiscussions((prev) =>
            prev.map((discussion) =>
              discussion.id === id
                ? { ...discussion, likes: Math.max(0, discussion.likes - 1) }
                : discussion
            )
          );
        }
      }

      return true;
    } catch (err) {
      console.error("Error toggling like:", err);
      setError("Не удалось изменить лайк");
      return false;
    }
  };

  const addComment = async (discussionId, commentData) => {
    try {
      const response = await CommunityApi.addComment(
        discussionId,
        commentData.text
      );
      if (response.statusCode === 201) {
        // Обновляем список обсуждений
        await loadDiscussions();
        return true;
      } else {
        setError(response.message || "Ошибка при добавлении комментария");
        return false;
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Не удалось добавить комментарий");
      return false;
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Функция для проверки, поставил ли пользователь лайк на обсуждение
  const hasUserLiked = (discussionId) => {
    return userLikes.has(discussionId);
  };

  const value = {
    discussions,
    loading,
    error,
    addDiscussion,
    updateDiscussion,
    deleteDiscussion,
    addComment,
    likeDiscussion,
    loadDiscussions,
    clearError,
    hasUserLiked,
  };

  return (
    <DiscussionContext.Provider value={value}>
      {children}
    </DiscussionContext.Provider>
  );
};
