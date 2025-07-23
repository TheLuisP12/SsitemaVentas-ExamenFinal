const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const bcrypt = require('bcryptjs');
const generarToken = require('../utils/generarToken');

/**
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ error: 'Credenciales inválidas' });

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(400).json({ error: 'Credenciales inválidas' });

    const token = generarToken(usuario);

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        nombre: usuario.nombre
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
