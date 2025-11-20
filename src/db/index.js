import { Sequelize } from 'sequelize';

const DATABASE = {
  name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
};

const options = process.env.NODE_ENV == 'production' ? 
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  } : {}

const sequelize = new Sequelize(`postgresql://${DATABASE.user}:${DATABASE.password}@${DATABASE.host}:${DATABASE.port}/${DATABASE.name}`, {
  dialect: 'postgres',
  logging: false,
  ...options
});

export default sequelize;
