// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });
  
    return User;
  };