const { body } = require('express-validator');

const validarVenta = [
  body('usuario_id').isInt({ gt: 0 }).withMessage('Debe proporcionar un ID de usuario válido'),
  body('metodo_pago').notEmpty().withMessage('Debe especificar un método de pago'),
  body('detalles').isArray({ min: 1 }).withMessage('Debe incluir al menos un producto'),
  body('detalles.*.producto_id').isInt({ gt: 0 }).withMessage('ID de producto inválido'),
  body('detalles.*.cantidad').isInt({ gt: 0 }).withMessage('Cantidad inválida')
];

module.exports = validarVenta;
