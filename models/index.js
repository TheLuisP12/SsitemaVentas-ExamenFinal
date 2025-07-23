const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Producto = require('./producto');
const Venta = require('./venta');
const DetalleVenta = require('./detalleVenta');

// Relaciones
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });

Venta.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Venta, { foreignKey: 'usuario_id' });

DetalleVenta.belongsTo(Venta, { foreignKey: 'venta_id' });
DetalleVenta.belongsTo(Producto, { foreignKey: 'producto_id' });

Venta.hasMany(DetalleVenta, { foreignKey: 'venta_id' });
Producto.hasMany(DetalleVenta, { foreignKey: 'producto_id' });

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Producto,
  Venta,
  DetalleVenta
};
