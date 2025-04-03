// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');  // Asegúrate de configurar la base de datos correctamente

const User = require('./User')(sequelize, DataTypes);  // Aquí es donde se importa el modelo User

module.exports = {
  sequelize,
  User,
};