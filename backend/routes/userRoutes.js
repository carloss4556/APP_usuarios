// routes/userRoutes.js
const express = require('express');
const { User } = require('../models');  // Importamos el modelo User
const router = express.Router();

// 1. Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();  // Obtenemos todos los usuarios de la base de datos
    res.json(users);  // Respondemos con la lista de usuarios
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// 2. Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, id_usuario, nacimiento, descripcion } = req.body;

    // Verificamos que los datos estén completos
    if (!nombre || !id_usuario || !nacimiento || !descripcion) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    // Creamos un nuevo usuario
    const newUser = await User.create({ nombre, id_usuario, nacimiento, descripcion });
    res.status(201).json(newUser);  // Respondemos con el usuario creado
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
});

// 3. Actualizar un usuario por ID
router.put('/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const { nombre, nacimiento, descripcion } = req.body;

    // Buscamos el usuario por su ID
    const user = await User.findOne({ where: { id_usuario } });

    // Si no encontramos al usuario, respondemos con un error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizamos los campos del usuario
    user.nombre = nombre || user.nombre;
    user.nacimiento = nacimiento || user.nacimiento;
    user.descripcion = descripcion || user.descripcion;

    await user.save();  // Guardamos los cambios en la base de datos

    res.json(user);  // Respondemos con el usuario actualizado
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
});

// 4. Eliminar un usuario por ID
router.delete('/:id_usuario', async (req, res) => {
  try {
    const { id_usuario } = req.params;

    // Buscamos el usuario por su ID
    const user = await User.findOne({ where: { id_usuario } });

    // Si no encontramos al usuario, respondemos con un error
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminamos el usuario de la base de datos
    await user.destroy();
    res.status(204).send();  // Respondemos sin contenido (204)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;