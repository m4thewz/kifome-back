import { DataTypes } from "sequelize";
import sequelize from "../index.js";

const Like = sequelize.define(
  "Like",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "users", key: "id" },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" },
    },
  },
  {
    tableName: "likes",
    timestamps: true,
  },
);

export default Like;
