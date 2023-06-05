const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
  }
}

User.init(
  {
    // Model attributes
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        // Hash password
      },
      async beforeUpdate(updatedUserData) {
        // Hash password
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
