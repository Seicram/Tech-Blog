const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Model attributes
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'post',
    freezeTableName: true,
  }
);

module.exports = Post;
