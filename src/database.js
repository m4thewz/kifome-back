import { Sequelize } from 'sequelize';

const DATABASE = {
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD
};

const sequelize = new Sequelize(DATABASE.name, DATABASE.user, DATABASE.password, {
  dialect: 'mysql',
  host: DATABASE.host,
  logging: false
});

export default sequelize;
