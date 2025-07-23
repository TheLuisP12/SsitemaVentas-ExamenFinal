const { body } = require('express-validator');

const validarUsuario = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('contraseña').optional().isLength({ min: 6 }).withMessage('Contraseña mínima de 6 caracteres'),
  body('rol').isIn(['admin', 'cliente', 'vendedor']).withMessage('Rol inválido')
];

module.exports = validarUsuario;
