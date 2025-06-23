"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "Согласен, игра действительно крутая! Особенно понравилась система боя.",
          author_id: 2,
          discussion_id: 1,
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
        },
        {
          text: "Отличные советы! Особенно про изучение механик - это действительно важно.",
          author_id: 1,
          discussion_id: 2,
          createdAt: new Date("2024-01-16"),
          updatedAt: new Date("2024-01-16"),
        },
        {
          text: "Мне больше всего понравились подземелья, очень атмосферно!",
          author_id: 2,
          discussion_id: 3,
          createdAt: new Date("2024-01-17"),
          updatedAt: new Date("2024-01-17"),
        },
        {
          text: "А я в восторге от лесных локаций, особенно ночью.",
          author_id: 1,
          discussion_id: 3,
          createdAt: new Date("2024-01-18"),
          updatedAt: new Date("2024-01-18"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
