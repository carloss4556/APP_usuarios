// Backend (Node.js con Express)

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = []; // Aquí pondrías tu base de datos

app.use(bodyParser.json()); // Para parsear JSON

// Ruta para actualizar un usuario
app.put('/api/users/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  const { nombre, nacimiento, descripcion } = req.body;

  // Encontrar el usuario en la "base de datos"
  const userIndex = users.findIndex(user => user.id_usuario === id_usuario);

  if (userIndex !== -1) {
    // Actualizar el usuario con los nuevos datos
    users[userIndex] = { id_usuario, nombre, nacimiento, descripcion };

    // Responder con el usuario actualizado
    return res.status(200).json(users[userIndex]);
  } else {
    // Si no se encuentra el usuario
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});

// Ruta para eliminar un usuario
app.delete('/api/users/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
  
    // Encontrar el índice del usuario
    const userIndex = users.findIndex(user => user.id_usuario === id_usuario);
  
    if (userIndex !== -1) {
      // Eliminar el usuario de la "base de datos"
      users.splice(userIndex, 1);
  
      // Responder con un mensaje de éxito
      return res.status(200).json({ message: 'Usuario eliminado' });
    } else {
      // Si no se encuentra el usuario
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });