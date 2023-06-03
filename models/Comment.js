// For Mongoose
let Comment;
if (process.env.USE_MONGOOSE) {
  const mongoose = require('mongoose');

  const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });

  Comment = mongoose.model('Comment', commentSchema);
}
// For Sequelize
else {
  const { Model, DataTypes } = require('sequelize');
  const sequelize = require('../config/connection');

  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "post",
          key: "id"
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment',
    }
  );
}

module.exports = Comment;
