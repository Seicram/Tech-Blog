// database.js
const mongoose = require('mongoose');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Mongoose schema
const mongoosePostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Sequelize model
class SequelizePost extends Model {}

SequelizePost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Exporting the unified model
let Post;
if (mongoose.models.Post) {
  Post = mongoose.model('Post');
} else {
  Post = SequelizePost;
}

module.exports = Post;
