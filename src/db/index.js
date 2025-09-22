import { Sequelize } from "sequelize";

const db = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
};

const sequelize = new Sequelize(db.name, db.user, db.password, {
  dialect: "mysql",
  host: db.host,
});

export default sequelize;
