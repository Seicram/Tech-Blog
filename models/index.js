// TODO: Define & lay out data for database (use sequelize and ORM)
const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// BlogPost belongs to one User
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
})

// User can have many BlogPosts
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

// BlogPost can have many Comments
// When we delete a BlogPost, make sure to delete the associated Comments
BlogPost.hasMany(Comment, {
    foreignKey: 'blogPost_id',
    onDelete: 'CASCADE',
})

// A Comment belongs to one User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

// A User can have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})

// TODO: Export models as an object
module.exports = { User, BlogPost, Comment };