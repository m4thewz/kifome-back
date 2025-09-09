import { Sequelize } from "sequelize";
import db from "../index.js";

const User = db.define("User", 
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: true },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    avatarUrl: { type: Sequelize.STRING, allowNull: true }
  },
  {
    tableName: "users",
    timestamps: true
  }
);

export default User;
