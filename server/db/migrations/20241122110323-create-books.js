"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      genre: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coverImageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      isbn: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books");
  },
};
