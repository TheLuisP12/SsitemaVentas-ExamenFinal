const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');
const validarCategoria = require('../middlewares/categoriaValidator');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

// Rutas públicas (si se desea, se puede hacer privadas también)
router.get('/', verificarToken, categoriaController.obtenerCategorias);
router.get('/:id', verificarToken, categoriaController.obtenerCategoriaPorId);

// Rutas protegidas por rol
router.post('/', verificarToken, verificarRol('admin'), validarCategoria, categoriaController.crearCategoria);
router.put('/:id', verificarToken, verificarRol('admin'), validarCategoria, categoriaController.actualizarCategoria);
router.delete('/:id', verificarToken, verificarRol('admin'), categoriaController.eliminarCategoria);

module.exports = router;
