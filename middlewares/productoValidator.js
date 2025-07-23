const { body } = require('express-validator');

const validarProducto = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
  body('categoria_id').isInt({ gt: 0 }).withMessage('Debe especificarse una categoría válida'),
  body('imagen_url').optional().isURL().withMessage('La URL de la imagen no es válida')
];

module.exports = validarProducto;
