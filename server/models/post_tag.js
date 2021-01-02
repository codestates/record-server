'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.post.belongsToMany(models.tag, {through: 'post_tag'});
      // models.tag.belongsToMany(models.post, {through: 'post_tag'});
      // models.Post_Tag.belongsTo(models.Post);//N대1(다대1)
      // models.Post_Tag.belongsTo(models.Tag);
    }
  };
  Post_Tag.init({
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_Tag',
  });
  return Post_Tag;
};