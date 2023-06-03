const sequelize = require('../config/connection');
const seedUser = require('./userData.json');
const seedPost = require('./postData.json')
const seedComment = require('./commentData.json');
const {User, Post, Comment} = require('../models')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUser);

  await Post.bulkCreate(seedPost);

  await Comment.bulkCreate(seedComment);

  process.exit(0);
};

seedAll();
