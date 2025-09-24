import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    recipeId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "recipes", key: "id" } },
    authorId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
  },
  {
    tableName: "comments",
    timestamps: true,
  },
);

export default Comment;
