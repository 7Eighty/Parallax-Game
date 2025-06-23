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
          image: "https://vkplay.ru/hotbox/content_files/gallery/32/b8/d72d3e67.jpeg",
          createdAt: new Date("2025-06-20"),
          updatedAt: new Date("2025-06-20"),
        },
        {
          title: "Советы для новичков",
          description:
            "Хочу поделиться несколькими полезными советами для тех, кто только начинает играть. Начните с изучения базовых механик и не торопитесь проходить игру.",
          author_id: 2,
          likes: 3,
          image: "https://irecommend.ru/sites/default/files/imagecache/copyright1/user-images/982259/tsTHj1frkUivCKJrf6SA.jpg",
          createdAt: new Date("2025-06-21"),
          updatedAt: new Date("2025-06-21"),
        },
        {
          title: "Лучшие локации в игре",
          description:
            "Обсудим самые красивые и интересные локации в The Overthrow. Какие места вам больше всего понравились?",
          author_id: 1,
          likes: 8,
          image: "https://storge.pic2.me/upload/384/61d9ffb5d3fce9.77933859.jpg",
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
