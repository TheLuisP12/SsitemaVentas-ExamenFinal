const express = require('express');
const router = express.Router();

const ventaController = require('../controllers/ventaController');
const validarVenta = require('../middlewares/ventaValidator');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas para admin o vendedor
router.get('/', verificarToken, verificarRol('admin', 'vendedor'), ventaController.obtenerVentas);
router.get('/:id', verificarToken, verificarRol('admin', 'vendedor'), ventaController.obtenerVentaPorId);
router.post('/', verificarToken, verificarRol('admin', 'vendedor'), validarVenta, ventaController.crearVenta);
router.delete('/:id', verificarToken, verificarRol('admin'), ventaController.eliminarVenta);

module.exports = router;
