'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.tag.belongsToMany(models.post, {through: 'post_tag'});
      
      // const { post, comment, tag, user } = sequelize.models;
      models.Tag.belongsToMany(models.Post, {through: 'Post_Tag'});
    }
  };
  Tag.init({
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};