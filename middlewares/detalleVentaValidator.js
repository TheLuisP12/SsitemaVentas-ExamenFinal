const { body } = require('express-validator');

const validarDetalleVenta = [
  body('cantidad').isInt({ gt: 0 }).withMessage('Cantidad inválida'),
  body('precio_unitario').isFloat({ gt: 0 }).withMessage('Precio unitario inválido')
];

module.exports = validarDetalleVenta;
