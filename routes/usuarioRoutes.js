const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validarUsuario = require('../middlewares/usuarioValidator');
const { verificarToken, verificarRol } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, verificarRol('admin'), usuarioController.obtenerUsuarios);
router.get('/:id', verificarToken, verificarRol('admin', 'cliente'), usuarioController.obtenerUsuarioPorId);
router.post('/', verificarToken, verificarRol('admin'), validarUsuario, usuarioController.crearUsuario);
router.put('/:id', verificarToken, verificarRol('admin'), validarUsuario, usuarioController.actualizarUsuario);
router.delete('/:id', verificarToken, verificarRol('admin'), usuarioController.eliminarUsuario);

module.exports = router;
