'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING
      },
      id_kategori: {
        type: Sequelize.STRING,
        references: {
          model: 'kategoris',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('produks');
  }
};