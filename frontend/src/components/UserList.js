import React, { useState, useEffect } from 'react';
import EditUserForm from './EditUserForm';  // Importación del formulario de edición

const UserList = ({ users }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Asegúrate de que users no sea undefined
  const userList = users && Array.isArray(users) ? users : [];

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {userList.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Fecha de Nacimiento</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.nombre}</td>
                <td>{user.id_usuario}</td>
                <td>{user.nacimiento}</td>
                <td>{user.descripcion}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <EditUserForm user={editingUser} onSave={(updatedUser) => {
          // Aquí podrías actualizar el estado de los usuarios con los nuevos datos
          console.log(updatedUser);
          setEditingUser(null); // Cerrar el formulario después de guardar
        }} />
      )}
    </div>
  );
};

export default UserList;