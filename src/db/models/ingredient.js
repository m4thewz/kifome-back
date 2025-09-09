import { Sequelize } from "sequelize";
import db from "../index.js";

const Ingredient = db.define("Ingredient",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, unique: true }
  },
  {
    tableName: "ingredients",
    timestamps: false
  }
);

export default Ingredient;
