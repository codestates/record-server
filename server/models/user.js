'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // const { post, comment, tag, user } = sequelize.models;
      // models.User.hasMany(models.Comment);//1대다
      // models.User.hasMany(models.Post);
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profileUrl: DataTypes.BLOB,
    introduce: DataTypes.STRING,
    nickname: DataTypes.STRING,
    githubUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',//!!!!!!! 이 user모델을 require하는쪽에서는 이 이름을 써야함(대문자 주의)
  });
  return User;
};