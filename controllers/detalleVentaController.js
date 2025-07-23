const { DetalleVenta, Producto, Venta } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Obtener todos los detalles de una venta
 */
const obtenerDetallesPorVenta = async (req, res) => {
  try {
    const detalles = await DetalleVenta.findAll({
      where: { venta_id: req.params.venta_id },
      include: [{ model: Producto }]
    });

    res.json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Actualizar un detalle específico
 */
const actualizarDetalle = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { cantidad, precio_unitario } = req.body;

  try {
    const detalle = await DetalleVenta.findByPk(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'Detalle no encontrado' });

    detalle.cantidad = cantidad ?? detalle.cantidad;
    detalle.precio_unitario = precio_unitario ?? detalle.precio_unitario;

    await detalle.save();
    res.json(detalle);
  } catch (error) {
    console.error('Error al actualizar detalle:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Eliminar un detalle
 */
const eliminarDetalle = async (req, res) => {
  try {
    const detalle = await DetalleVenta.findByPk(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'Detalle no encontrado' });

    await detalle.destroy();
    res.json({ mensaje: 'Detalle eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar detalle:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerDetallesPorVenta,
  actualizarDetalle,
  eliminarDetalle
};
