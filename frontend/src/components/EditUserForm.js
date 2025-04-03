import React, { useState, useEffect } from 'react';

const EditUserForm = ({ user, onSave, onCancel }) => {
  // Establecemos el estado con los valores del usuario que recibimos como props
  const [nombre, setNombre] = useState(user.nombre);
  const [id_usuario, setIdUsuario] = useState(user.id_usuario);
  const [nacimiento, setNacimiento] = useState(user.nacimiento);
  const [descripcion, setDescripcion] = useState(user.descripcion);
  
  // Estado para manejar la carga y los errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Actualizamos los valores si el usuario cambia
  useEffect(() => {
    setNombre(user.nombre);
    setIdUsuario(user.id_usuario);
    setNacimiento(user.nacimiento);
    setDescripcion(user.descripcion);
  }, [user]);

  // Función que manejará el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validamos si los campos están vacíos
    if (!nombre || !id_usuario || !nacimiento || !descripcion) {
      setError('Todos los campos son obligatorios');
      return;
    }
    
    setLoading(true); // Activamos la carga

    const updatedUser = { nombre, id_usuario, nacimiento, descripcion };

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }

      const data = await response.json();
      onSave(data); // Pasamos los datos actualizados al componente padre
      setLoading(false);
      setError(null); // Limpiamos el error si todo va bien
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>ID Usuario:</label>
          <input
            type="text"
            value={id_usuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            disabled // El ID del usuario no debe ser modificado
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
