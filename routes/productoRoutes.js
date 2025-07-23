const express = require('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const validarProducto = require('../middlewares/productoValidator');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas públicas autenticadas
router.get('/', verificarToken, productoController.obtenerProductos);
router.get('/:id', verificarToken, productoController.obtenerProductoPorId);

// Rutas protegidas (solo admin puede crear, editar o eliminar productos)
router.post('/', verificarToken, verificarRol('admin'), validarProducto, productoController.crearProducto);
router.put('/:id', verificarToken, verificarRol('admin'), validarProducto, productoController.actualizarProducto);
router.delete('/:id', verificarToken, verificarRol('admin'), productoController.eliminarProducto);

module.exports = router;
