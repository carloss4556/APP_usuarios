// src/services/api.js
const apiUrl = 'http://localhost:5000/api/users';

// Función para obtener la lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await fetch(apiUrl);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Función para agregar un nuevo usuario
export const addUser = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return null;
  }
};