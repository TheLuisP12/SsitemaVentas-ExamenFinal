const { body } = require('express-validator');

const validarCategoria = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('descripcion').optional().isString().withMessage('La descripción debe ser texto')
];

module.exports = validarCategoria;
