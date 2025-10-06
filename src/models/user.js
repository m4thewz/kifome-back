import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async user => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async user => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  }
);

User.prototype.comparePassword = async function (passwordToCompare) {
  return await bcrypt.compare(passwordToCompare, this.password);
};

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
