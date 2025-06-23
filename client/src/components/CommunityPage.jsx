import React, { useState } from "react";
import { useDiscussions } from "../context/DiscussionContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./CommunityPage.css";

const CommunityPage = () => {
  const {
    discussions,
    addDiscussion,
    updateDiscussion,
    likeDiscussion,
    addComment,
    deleteDiscussion,
    loading,
    error,
    clearError,
    hasUserLiked,
  } = useDiscussions();
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDiscussion, setEditingDiscussion] = useState(null);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editDiscussion, setEditDiscussion] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [newComment, setNewComment] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (user && newDiscussion.title && newDiscussion.description) {
      const success = await addDiscussion({
        title: newDiscussion.title,
        description: newDiscussion.description,
        image: newDiscussion.image || null,
      });

      if (success) {
        setNewDiscussion({ title: "", description: "", image: "" });
        setShowCreateForm(false);
      }
    }
  };

  const handleEditDiscussion = async (e) => {
    e.preventDefault();
    if (
      user &&
      editDiscussion.title &&
      editDiscussion.description &&
      editingDiscussion
    ) {
      const success = await updateDiscussion(editingDiscussion, {
        title: editDiscussion.title,
        description: editDiscussion.description,
        image: editDiscussion.image || null,
      });

      if (success) {
        setEditDiscussion({ title: "", description: "", image: "" });
        setEditingDiscussion(null);
      }
    }
  };

  const startEditing = (discussion) => {
    setEditingDiscussion(discussion.id);
    setEditDiscussion({
      title: discussion.title,
      description: discussion.description,
      image: discussion.image || "",
    });
  };

  const cancelEditing = () => {
    setEditingDiscussion(null);
    setEditDiscussion({ title: "", description: "", image: "" });
  };

  const handleAddComment = async (discussionId) => {
    if (user && newComment.trim()) {
      const success = await addComment(discussionId, {
        text: newComment,
      });

      if (success) {
        setNewComment("");
      }
    }
  };

  const handleDeleteDiscussion = async (discussionId) => {
    if (window.confirm("Вы уверены, что хотите удалить это обсуждение?")) {
      await deleteDiscussion(discussionId);
    }
  };

  const handleLikeDiscussion = async (discussionId) => {
    await likeDiscussion(discussionId);
  };

  // Очищаем ошибку при изменении состояния
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (loading && discussions.length === 0) {
    return (
      <div className="community-page">
        <div className="community-container">
          <div className="loading">Загрузка обсуждений...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="community-page">
      <div className="community-container">
        <div className="community-header">
          <h1>Сообщество игроков</h1>
          {user && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="create-discussion-btn"
            >
              {showCreateForm ? "Отменить" : "Создать обсуждение"}
            </button>
          )}
        </div>

        {error && (
          <div className="error-notice">
            <p>{error}</p>
            <button onClick={clearError} className="close-error">
              ✕
            </button>
          </div>
        )}

        {!user && (
          <div className="auth-notice">
            <p>
              Войдите в систему, чтобы создавать обсуждения и оставлять
              комментарии
            </p>
          </div>
        )}

        {showCreateForm && user && (
          <div className="create-discussion-form">
            <h3>Создать новое обсуждение</h3>
            <form onSubmit={handleCreateDiscussion}>
              <div className="form-group">
                <label>Тема</label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      title: e.target.value,
                    })
                  }
                  placeholder="Введите тему обсуждения"
                  required
                />
              </div>
              <div className="form-group">
                <label>Описание</label>
                <textarea
                  value={newDiscussion.description}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      description: e.target.value,
                    })
                  }
                  placeholder="Введите описание"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ссылка на изображение (необязательно)</label>
                <input
                  type="url"
                  value={newDiscussion.image}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Создание..." : "Создать обсуждение"}
              </button>
            </form>
          </div>
        )}

        <div className="discussions-list">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="discussion-card">
              {editingDiscussion === discussion.id ? (
                <div className="edit-discussion-form">
                  <h3>Редактировать обсуждение</h3>
                  <form onSubmit={handleEditDiscussion}>
                    <div className="form-group">
                      <label>Тема</label>
                      <input
                        type="text"
                        value={editDiscussion.title}
                        onChange={(e) =>
                          setEditDiscussion({
                            ...editDiscussion,
                            title: e.target.value,
                          })
                        }
                        placeholder="Введите тему обсуждения"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Описание</label>
                      <textarea
                        value={editDiscussion.description}
                        onChange={(e) =>
                          setEditDiscussion({
                            ...editDiscussion,
                            description: e.target.value,
                          })
                        }
                        placeholder="Введите описание"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Ссылка на изображение (необязательно)</label>
                      <input
                        type="url"
                        value={editDiscussion.image}
                        onChange={(e) =>
                          setEditDiscussion({
                            ...editDiscussion,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                      >
                        {loading ? "Сохранение..." : "Сохранить"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="cancel-btn"
                        disabled={loading}
                      >
                        Отменить
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="discussion-header">
                    <h3>{discussion.title}</h3>
                    <div className="discussion-meta">
                      <span className="author">
                        Автор: {discussion.author?.user_name || "Неизвестно"}
                      </span>
                      <span className="date">
                        {new Date(discussion.createdAt).toLocaleDateString()}
                      </span>
                      {user && discussion.author_id === user.id && (
                        <div className="discussion-actions-buttons">
                          <button
                            onClick={() => startEditing(discussion)}
                            className="edit-btn"
                            disabled={loading}
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteDiscussion(discussion.id)
                            }
                            className="delete-btn"
                            disabled={loading}
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {discussion.image && (
                    <div className="discussion-image">
                      <img src={discussion.image} alt="Discussion" />
                    </div>
                  )}

                  <p className="discussion-description">
                    {discussion.description}
                  </p>

                  <div className="discussion-actions">
                    <button
                      onClick={() => handleLikeDiscussion(discussion.id)}
                      className={`like-btn ${
                        hasUserLiked(discussion.id) ? "liked" : ""
                      }`}
                      disabled={loading}
                    >
                      {hasUserLiked(discussion.id) ? "❤️" : "🤍"}{" "}
                      {discussion.likes}
                    </button>
                    <button
                      onClick={() =>
                        setSelectedDiscussion(
                          selectedDiscussion === discussion.id
                            ? null
                            : discussion.id
                        )
                      }
                      className="comment-toggle-btn"
                    >
                      💬 {discussion.comments?.length || 0}
                    </button>
                  </div>

                  {selectedDiscussion === discussion.id && (
                    <div className="comments-section">
                      <div className="comments-list">
                        {discussion.comments?.map((comment) => (
                          <div key={comment.id} className="comment">
                            <div className="comment-header">
                              <span className="comment-author">
                                {comment.author?.user_name || "Неизвестно"}
                              </span>
                              <span className="comment-date">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                          </div>
                        ))}
                      </div>

                      {user && (
                        <div className="add-comment">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Написать комментарий..."
                            rows={3}
                            disabled={loading}
                          />
                          <button
                            onClick={() => handleAddComment(discussion.id)}
                            disabled={!newComment.trim() || loading}
                            className="add-comment-btn"
                          >
                            {loading ? "Отправка..." : "Отправить"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {discussions.length === 0 && !loading && (
          <div className="no-discussions">
            <p>Пока нет обсуждений. Будьте первым!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
