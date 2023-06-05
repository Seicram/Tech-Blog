const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // Model attributes
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
    freezeTableName: true,
  }
);

module.exports = Comment;
