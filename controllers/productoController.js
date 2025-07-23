const { Producto, Categoria } = require('../models');
const { validationResult } = require('express-validator');

/**
 * Obtener todos los productos
 */
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({ include: Categoria });
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Obtener un producto por ID
 */
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, { include: Categoria });
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Crear un nuevo producto
 */
const crearProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { nombre, descripcion, precio, stock, categoria_id, imagen_url } = req.body;

  try {
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria_id,
      imagen_url
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Actualizar un producto
 */
const actualizarProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) return res.status(400).json({ errores: errores.array() });

  const { nombre, descripcion, precio, stock, categoria_id, imagen_url } = req.body;

  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.stock = stock || producto.stock;
    producto.categoria_id = categoria_id || producto.categoria_id;
    producto.imagen_url = imagen_url || producto.imagen_url;

    await producto.save();
    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Eliminar un producto
 */
const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
