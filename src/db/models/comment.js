import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Comment = sequelize.define(
  "Comment",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    recipeId: { type: DataTypes.INTEGER, allowNull: false },
    authorUsername: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "comments",
    timestamps: true,
  },
);

export default Comment;
