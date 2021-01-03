'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      profileUrl: {
        type: Sequelize.BLOB,
        allowNull: false,//!프론트에서 디폴트이미지 뿌려줄때를 위해
        defaultValue: 'null'//!!!이 null로해야됨 //allowNull:true로하면안됨
      },
      introduce: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'null'
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'null'
      },
      githubUrl: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'null'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};