const { Model, DataTypes } = require('sequelize');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.checkPassword = function (loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
};

// Define the User model for SQL
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Choose the appropriate model based on the database type
let UserModel;
const databaseType = 'mongodb'; // Set the desired database type here

if (databaseType === 'mongodb') {
  UserModel = mongoose.model('User', userSchema);
} else if (databaseType === 'sql') {
  UserModel = User;
}

module.exports = UserModel;
