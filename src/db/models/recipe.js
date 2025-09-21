import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Recipe = sequelize.define("Recipe",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    preparation: { type: DataTypes.TEXT, allowNull: false },
    portionQuantity: { type: DataTypes.INTEGER, allowNull: true },
    portionUnity: {
      type: DataTypes.ENUM("serving", "slice", "unit", "cup", "bowl"),
      allowNull: true
    },
    prepTime: { type: DataTypes.INTEGER, allowNull: true },
    authorUsername: { type: DataTypes.STRING, allowNull: false }
  },
  {
    tableName: "recipes",
    timestamps: true
  }
);

export default Recipe;
