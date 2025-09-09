import { Sequelize } from "sequelize";
import db from "../index.js";

const Like = db.define("Like",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "users", key: "id" }
    },
    recipeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: { model: "recipes", key: "id" }
    }
  },
  {
    tableName: "likes",
    timestamps: true
  },
);

export default Like;
