import React, { useState } from "react";
import "./ScreenshotsPage.css";

const ScreenshotsPage = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Примеры скриншотов
  const screenshots = [
    {
      id: "1",
      title: "Эпическая битва",
      imageUrl: "/img/fight.jpg",
      description: "Захватывающий момент эпической битвы в подземельях",
    },
    {
      id: "2",
      title: "Красивый пейзаж",
      imageUrl: "/img/townhall.jpg",
      description: "Великолепные пейзажи игрового мира",
    },
    {
      id: "3",
      title: "Городские улицы",
      imageUrl: "/img/street.jpg",
      description: "Жизнь в оживленных городских кварталах",
    },
    {
      id: "4",
      title: "Лесные тропы",
      imageUrl: "/img/tropa.jpg",
      description: "Таинственные тропы в древнем лесу",
    },
    {
      id: "5",
      title: "Подземные сокровища",
      imageUrl: "/img/gold.jpg",
      description: "Сокровища, скрытые в глубинах подземелий",
    },
    {
      id: "6",
      title: "Магические порталы",
      imageUrl: "/img/portal.jpg",
      description: "Древние магические порталы между мирами",
    },
  ];

  const openModal = (screenshot) => {
    setSelectedScreenshot(screenshot);
  };

  const closeModal = () => {
    setSelectedScreenshot(null);
  };

  return (
    <div className="screenshots-page">
      <div className="screenshots-container">
        <h1>Скриншоты игры</h1>
        <p className="screenshots-description">
          Погрузитесь в визуальный мир The Overthrow через наши лучшие скриншоты
        </p>

        <div className="screenshots-grid">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="screenshot-card"
              onClick={() => openModal(screenshot)}
            >
              <div className="screenshot-image">
                <img src={screenshot.imageUrl} alt={screenshot.title} />
                <div className="screenshot-overlay">
                  <span className="view-icon">👁️</span>
                </div>
              </div>
              <div className="screenshot-info">
                <h3>{screenshot.title}</h3>
                <p>{screenshot.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра скриншота */}
      {selectedScreenshot && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>
            <div className="modal-image">
              <img
                src={selectedScreenshot.imageUrl}
                alt={selectedScreenshot.title}
              />
            </div>
            <div className="modal-info">
              <h2>{selectedScreenshot.title}</h2>
              <p>{selectedScreenshot.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsPage;
