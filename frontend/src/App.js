import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Usuarios from './pages/usuarios';
import CrearEditarUsuario from './pages/CrearEditarUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/crear" element={<CrearEditarUsuario />} />
        <Route path="/usuarios/editar/:id" element={<CrearEditarUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;