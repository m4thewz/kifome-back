import { Sequelize } from "sequelize";
import db from "../index.js";

const Category = db.define("Category",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, unique: true }
  },
  {
    tableName: "categories",
    timestamps: false
  }
);

export default Category;
