'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      produk.hasMany(models.Kategori, {foreignKey: 'id'})
    }
  }
  produk.init({
    nama_produk: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deskripsi: DataTypes.INTEGER,
    foto: DataTypes.STRING,
    id_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'produk',
  });
  return produk;
};