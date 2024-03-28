'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {

    static associate(models) {
      Kategori.belongsTo(models.produk, { foreignKey: 'id' });
    }
  }
  Kategori.init({
    nama: DataTypes.STRING,
   
  }, {
    sequelize,
    modelName: 'Kategori',
  });
  return Kategori;
};