const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venta = require('./venta');
const Producto = require('./producto');

const DetalleVenta = sequelize.define('DetalleVenta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venta,
      key: 'id'
    }
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'DetalleVenta',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['venta_id', 'producto_id']
    }
  ]
});

module.exports = DetalleVenta;
