import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Category = sequelize.define("Category",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    displayName: { type: DataTypes.STRING, allowNull: false }
  },
  {
    tableName: "categories",
    timestamps: false
  }
);

export default Category;
