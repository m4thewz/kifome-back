import { Sequelize } from "sequelize";
import db from "../index.js";

const Recipe = db.define("Recipe",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: true },
    preparation: { type: Sequelize.TEXT, allowNull: false },
    portions: { type: Sequelize.INTEGER, allowNull: true },
    prepTime: { type: Sequelize.INTEGER, allowNull: true },
    authorId: { type: Sequelize.INTEGER, allowNull: false }
  },
  {
    tableName: "recipes",
    timestamps: true
  }
);

export default Recipe;
