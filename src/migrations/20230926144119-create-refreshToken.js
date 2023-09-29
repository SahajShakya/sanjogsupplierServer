'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RefreshTokens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      revokedByIp: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      revoked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdByIp: {
        type:  Sequelize.STRING(255),
        allowNull: true,
      },
      isExpired: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RefreshTokens');
  }
};
