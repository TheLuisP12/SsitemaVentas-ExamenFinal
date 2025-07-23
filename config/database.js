const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga variables del archivo .env

// Crear instancia Sequelize
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false, // true si usas Azure
        trustServerCertificate: true
      }
    },
    logging: false // true para ver queries en consola
  }
);

module.exports = sequelize;
