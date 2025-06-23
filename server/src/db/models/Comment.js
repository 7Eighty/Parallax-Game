"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: "author_id",
        as: "author",
      });
      Comment.belongsTo(models.Discussion, {
        foreignKey: "discussion_id",
        as: "discussion",
      });
    }
  }
  Comment.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      discussion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Discussions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "Comments",
      timestamps: true,
    }
  );
  return Comment;
};
