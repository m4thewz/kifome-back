import { Sequelize } from "sequelize";
import db from "../index.js";

const Comment = db.define("Comment",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: Sequelize.TEXT, allowNull: false },
    recipeId: { type: Sequelize.INTEGER, allowNull: false },
    authorId: { type: Sequelize.INTEGER, allowNull: false }
  },
  {
    tableName: "comments",
    timestamps: true
  }
);

export default Comment;
