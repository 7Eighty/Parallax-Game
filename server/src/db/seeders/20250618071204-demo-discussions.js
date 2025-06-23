"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Discussions",
      [
        {
          title: "Первое обсуждение игры",
          description:
            "Отличная игра! Очень понравился геймплей и графика. Особенно впечатлили боевые сцены и система прокачки персонажей.",
          author_id: 1,
          likes: 5,
          image: "https://cdnb.artstation.com/p/assets/images/images/038/099/039/large/climber-g-.jpg?1622154778",
          createdAt: new Date("2025-06-20"),
          updatedAt: new Date("2025-06-20"),
        },
        {
          title: "Советы для новичков",
          description:
            "Хочу поделиться несколькими полезными советами для тех, кто только начинает играть. Начните с изучения базовых механик и не торопитесь проходить игру.",
          author_id: 2,
          likes: 3,
          image: "https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/VDQ10E2VMI9T1589912855089.jpg",
          createdAt: new Date("2025-06-21"),
          updatedAt: new Date("2025-06-21"),
        },
        {
          title: "Лучшие локации в игре",
          description:
            "Обсудим самые красивые и интересные локации в The Overthrow. Какие места вам больше всего понравились?",
          author_id: 1,
          likes: 8,
          image: "https://images.noob-club.ru/news/2016/02/0tdeeg3ygs.jpg",
          createdAt: new Date("2025-06-22"),
          updatedAt: new Date("2025-06-22"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Discussions", null, {});
  },
};
