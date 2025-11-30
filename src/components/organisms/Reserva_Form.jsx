import React, { useState } from 'react';
import { reservaService } from '../../services/reservaService'; 

export default function Reserva_Form() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    numPersonas: 1 
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ PARA MOSTRAR CARGA

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        return value.trim().length < 5 ? 'Completar nombre y apellido (mínimo 5 caracteres).' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? 'Ingrese un correo electrónico válido (ej: ejemplo@dominio.com).'
          : '';
      case 'telefono':
        return !/^[0-9]{9}$/.test(value)
          ? 'El teléfono debe tener 9 dígitos (solo números).'
          : '';
      case 'fecha':
        return !value ? 'Debe seleccionar una fecha.' : '';
      case 'hora':
        return !value ? 'Debe seleccionar una hora.' : '';
      case 'numPersonas':
        return value < 1 || value > 12 ? 'El número de personas debe ser entre 1 y 12.' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (isSubmitted) {
      const error = validateField(name, value);
      setFieldErrors({ ...fieldErrors, [name]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setLoading(true); 

    const errors = {};
    Object.keys(formData).forEach((key) => {
      errors[key] = validateField(key, formData[key]);
    });
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err !== '');
    if (hasErrors) {
      setLoading(false);
      return;
    }

    //  CONEXIÓN CON BACKEND
    try {
      console.log('Enviando reserva al backend:', formData);
      await reservaService.crearReserva(formData);
      
      alert('Reserva enviada con éxito ✅');
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
        numPersonas: 1
      });
      setIsSubmitted(false);
      setFieldErrors({});
      
    } catch (error) {
      console.error('Error al crear reserva:', error);
      alert(`❌ Error al crear reserva: ${error.message || error}`);
    } finally {
      setLoading(false); //  DESACTIVAR LOADING
    }
  };

  const errorMessages = Object.values(fieldErrors).filter((e) => e);

  return (
    <section className="contenedor-reserva-blog">
      <section className="reservacion">
        <h2>Reserva tu mesa</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Tu nombre completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={fieldErrors.nombre ? 'input-error' : ''}
          />

          <label>Email:</label>
          <input
            type="email"
            placeholder="correo electronico (ej:xxx@xx.com)"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={fieldErrors.email ? 'input-error' : ''}
          />

          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder='Tu teléfono (9 dígitos, solo numeros)'
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={fieldErrors.telefono ? 'input-error' : ''}
          />

          <label>Fecha:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className={fieldErrors.fecha ? 'input-error' : ''}
          />

          <label>Hora:</label>
          <select
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className={fieldErrors.hora ? 'input-error' : ''}
          >
            <option value="">Seleccione hora</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="17:00">05:00 PM</option>
          </select>

          {/* ✅ NUEVO CAMPO */}
          <label>Número de Personas:</label>
          <input
            type="number"
            name="numPersonas"
            value={formData.numPersonas}
            onChange={handleChange}
            min="1"
            max="20"
            className={fieldErrors.numPersonas ? 'input-error' : ''}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Reservar'}
          </button>

          {isSubmitted && errorMessages.length > 0 && (
            <div id="errores-globales">
              {errorMessages.map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          )}
        </form>
      </section>

      {/* Tu sección del blog permanece igual */}
      <section className="blog-nebula">
        <h2>
          <i className="fab fa-instagram" aria-hidden="true"></i> Síguenos en{' '}
          <a href="https://www.instagram.com/nebula-cafe" target="_blank" rel="noopener noreferrer" className="instagram-handle">
            @nebula-cafe
          </a>
        </h2>
        <div className="instagram-grid">
          <a href="https://www.instagram.com/p/xxx1" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO05Pqzb_Xf_U6Mcx2vX-wRpNRrAwfvUTGug&s" alt="Nebula Cafe interior" />
          </a>
          <a href="https://www.instagram.com/p/xxx2" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQln2k7AzZua3qO5IdumU4J9a6AUCCwEwSItg&s" alt="Nebula Cafe clientes" />
          </a>
          <a href="https://www.instagram.com/p/xxx3" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-8JXSmxNW0XYMylsLxEL67vNc0wbjovBm8Q&s" alt="Nebula Cafe productos" />
          </a>
          <a href="https://www.instagram.com/p/xxx4" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJl4G18Lak8Plldc7voWIv24P2HhnZVFSZGg&s" alt="Nebula Cafe ambiente" />
          </a>
          <a href="https://www.instagram.com/p/xxx5" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbWYr-6mpNxooSq_jiU1Gw-ZNDOJBYK1P_g&s" alt="Nebula Cafe eventos" />
          </a>
          <a href="https://www.instagram.com/p/xxx6" target="_blank" rel="noopener noreferrer">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw5GSwk-vinyGtyekbrZVsKZ1RNiLgXoOk5g&s" alt="Nebula Cafe equipo" />
          </a>
        </div>
      </section>
      </section>
  );
}
