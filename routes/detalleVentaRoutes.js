const express = require('express');
const router = express.Router();

const detalleVentaController = require('../controllers/detalleVentaController');
const validarDetalleVenta = require('../middlewares/detalleVentaValidator');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Consultar detalles por venta
router.get('/venta/:venta_id', verificarToken, verificarRol('admin', 'vendedor'), detalleVentaController.obtenerDetallesPorVenta);

// Actualizar un detalle
router.put('/:id', verificarToken, verificarRol('admin'), validarDetalleVenta, detalleVentaController.actualizarDetalle);

// Eliminar un detalle
router.delete('/:id', verificarToken, verificarRol('admin'), detalleVentaController.eliminarDetalle);

module.exports = router;
