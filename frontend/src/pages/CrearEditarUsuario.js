import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import validator from 'validator'; // Librería para validación
import DOMPurify from 'dompurify'; // Librería para sanitizar entradas

function CrearEditarUsuario() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    telefono: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validar datos del formulario
  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'El nombre de usuario es obligatorio.';
    if (!formData.email || !validator.isEmail(formData.email)) newErrors.email = 'Correo electrónico inválido.';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (!formData.telefono || !validator.isMobilePhone(formData.telefono, 'any'))
      newErrors.telefono = 'Número de teléfono inválido.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const sanitizedData = {
        username: DOMPurify.sanitize(formData.username),
        email: DOMPurify.sanitize(formData.email),
        password: DOMPurify.sanitize(formData.password),
        telefono: DOMPurify.sanitize(formData.telefono),
      };
      const response = await api.post('/usuarios/crear/', sanitizedData);
      navigate('/usuarios');
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  // Cambiar valores del formulario y sanitizar
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value); // Sanitizar input
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  return (
    <div className="container mt-5">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className={`form-control ${errors.username && 'is-invalid'}`}
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa el nombre de usuario"
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa el correo electrónico"
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa la contraseña"
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className={`form-control ${errors.telefono && 'is-invalid'}`}
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingresa el número de teléfono"
            required
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default CrearEditarUsuario;