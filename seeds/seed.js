// TODO: Import dependencies, including sequelize
const sequelize = require("../config/connection")
const {User, BlogPost, Comment} = require("../models")

// TODO: Create seedDatabase 'async/await' function
const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('\n---------- USERS SEEDED ----------\n');
  
    for (const blogPost of blogPostData) {
      await BlogPost.create({
        ...blogPost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
      console.log('\n---------- BLOGPOSTS SEEDED ----------\n');
    }

    const comments = await Comment.bulkCreate(commentData, {
      returning: true,
    });
    console.log('\n---------- COMMENTS SEEDED ----------\n');
  
    process.exit(0);
  };
  
// TODO: Call seedDatabase() function
seedDatabase();