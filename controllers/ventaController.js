const { Venta, DetalleVenta, Producto, Usuario } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Obtener todas las ventas
 */
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'email'] },
        {
          model: DetalleVenta,
          include: [{ model: Producto }]
        }
      ]
    });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Obtener una venta por ID
 */
const obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: [
        { model: Usuario, attributes: ['id', 'nombre', 'email'] },
        {
          model: DetalleVenta,
          include: [{ model: Producto }]
        }
      ]
    });

    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    console.error('Error al obtener venta:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Crear una venta con detalles
 */
const crearVenta = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { usuario_id, metodo_pago, detalles } = req.body;

  try {
    // Calcular total
    let total = 0;
    for (const item of detalles) {
        const producto = await Producto.findByPk(item.producto_id);
        if (!producto) {
            return res.status(400).json({ error: `Producto con ID ${item.producto_id} no encontrado` });
         }

        if (producto.stock < item.cantidad) {
            return res.status(400).json({ 
                error: `Stock insuficiente para el producto "${producto.nombre}". Disponible: ${producto.stock}, Solicitado: ${item.cantidad}` 
         });
        }     

        total += producto.precio * item.cantidad;
    }

    // Crear la venta
    const venta = await Venta.create({ usuario_id, metodo_pago, total });

    // Crear detalles
    for (const item of detalles) {
      const producto = await Producto.findByPk(item.producto_id);
      await DetalleVenta.create({
        venta_id: venta.id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: producto.precio
      });
      producto.stock -= item.cantidad;
      await producto.save();
    }

    res.status(201).json({ mensaje: 'Venta creada exitosamente', venta_id: venta.id });
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Eliminar una venta (y sus detalles)
 */
const eliminarVenta = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });

    await DetalleVenta.destroy({ where: { venta_id: venta.id } });
    await venta.destroy();

    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  eliminarVenta
};
