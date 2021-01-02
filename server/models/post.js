'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // const { post, comment, tag, user } = sequelize.models;
      // models.post.hasMany(models.comment, {
      //   foreignKey: {
      //     name: 'postId'
      //   }
      // })
      models.Post.hasMany(models.Comment);
      // models.post.belongsToMany(tag);//다대다
      models.Post.belongsToMany(models.Tag, {through: 'Post_Tag'});
      
      // const { post, comment, tag, user } = sequelize.models;
      // post.belongsToMany(tag, {through: 'post_tag'});
    }
  };
  Post.init({
    title: DataTypes.STRING,
    contents: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};