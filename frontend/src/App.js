// src/App.js
import React, { useState } from 'react';
import './App.css';
import AddUserForm from './components/AddUserForm';  // Aquí importas correctamente el componente
import UserList from './components/UserList';
import UserManager from './components/UserManager';
import EditUserForm from './components/EditUserForm';
function App() {
  return (
    <div className="App">
      <UserManager />
    </div>
  );
}

export default App;
