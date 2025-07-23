require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con SQL Server.');

    await sequelize.sync(); // true si deseas que actualice columnas automáticamente
    console.log('Modelos sincronizados correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor o la base de datos:', error);
  }
})();
