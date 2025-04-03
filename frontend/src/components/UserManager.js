// src/components/UserManager.js
// src/components/UserManager.js
import React, { useState } from 'react';
import AddUserForm from './AddUserForm';
import UserList from './UserList';

const UserManager = () => {
  const [refresh, setRefresh] = useState(false);

  // Función para indicar que un usuario fue agregado
  const handleUserAdded = () => {
    setRefresh((prev) => !prev);  // Esto forza a que UserList se recargue
  };

  return (
    <div>
      <AddUserForm onUserAdded={handleUserAdded} />
      <UserList key={refresh} /> {/* El key asegura que el componente UserList se recargue */}
    </div>
  );
};

export default UserManager;