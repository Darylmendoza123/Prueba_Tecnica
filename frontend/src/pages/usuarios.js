import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaSiguiente, setPaginaSiguiente] = useState(null);
  const [paginaAnterior, setPaginaAnterior] = useState(null);
  const [paginaActual, setPaginaActual] = useState('http://localhost:8000/api/usuarios/listar/');
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const respuesta = await api.get(paginaActual);
        setUsuarios(respuesta.data.results);
        setPaginaSiguiente(respuesta.data.next);
        setPaginaAnterior(respuesta.data.previous);
      } catch (error) {
        console.error('Error al cargar usuarios', error);
      }
    }
    cargarUsuarios();
  }, [paginaActual]);

  const eliminarUsuario = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await api.delete(`/usuarios/${id}/`);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario', error);
      }
    }
  };

  const exportarUsuariosCSV = async () => {
    try {
      const respuesta = await api.get('/usuarios/exportar-csv/', {
        responseType: 'blob', // Necesario para manejar archivos
      });

      const url = window.URL.createObjectURL(new Blob([respuesta.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'usuarios.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al exportar usuarios CSV', error);
    }
  };

  // Función logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Usuarios</h2>
        <button className="btn btn-warning" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/usuarios/crear" className="btn btn-success">
          Crear Usuario
        </Link>
        <button className="btn btn-info" onClick={exportarUsuariosCSV}>
          Exportar CSV
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.username}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>
                <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className={`page-item ${!paginaAnterior ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginaAnterior && setPaginaActual(paginaAnterior)}>
              Anterior
            </button>
          </li>
          <li className={`page-item ${!paginaSiguiente ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginaSiguiente && setPaginaActual(paginaSiguiente)}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Usuarios;