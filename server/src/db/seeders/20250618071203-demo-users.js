"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Test123!", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Player1",
          email: "player1@example.com",
          password: hashedPassword,
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-10"),
        },
        {
          user_name: "Player2",
          email: "player2@example.com",
          password: hashedPassword,
          createdAt: new Date("2024-01-11"),
          updatedAt: new Date("2024-01-11"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
