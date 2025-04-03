// src/components/AddUserForm.js
import React, { useState } from 'react';

const AddUserForm = ({ onUserAdded }) => {
  const [nombre, setNombre] = useState('');
  const [id_usuario, setIdUsuario] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const addUser = async (event) => {
    event.preventDefault(); // Evita la recarga de la página

    const userData = {
      nombre,
      id_usuario,
      nacimiento,
      descripcion,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const newUser = await response.json();
      console.log('Usuario creado:', newUser);

      // Llamamos a la función que actualiza la lista de usuarios
      if (onUserAdded) onUserAdded();  // Llamamos a la función para actualizar la lista
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      alert('Hubo un error al agregar el usuario. Por favor, inténtalo de nuevo.'); // Mostrar un mensaje de error
    }

    // Limpiar el formulario
    setNombre('');
    setIdUsuario('');
    setNacimiento('');
    setDescripcion('');
  };

  return (
    <form onSubmit={addUser}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID de Usuario"
        value={id_usuario}
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <input
        type="date"
        value={nacimiento}
        onChange={(e) => setNacimiento(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default AddUserForm;  // Asegúrate de exportar el componente aquí