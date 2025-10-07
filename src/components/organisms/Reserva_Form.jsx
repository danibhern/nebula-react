import React, { useState } from 'react';

export default function Reserva_Form() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validaciones
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const errors = {};
    Object.keys(formData).forEach((key) => {
      errors[key] = validateField(key, formData[key]);
    });
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err !== '');
    if (hasErrors) return;

    console.log('Formulario enviado con éxito:', formData);
    alert('Reserva enviada con éxito ✅');

    // 🔄 Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
    });
    setIsSubmitted(false);
    setFieldErrors({});
  };

  // 👇 Se muestran todos los errores juntos al final
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
            placeholder="correo electronico (ej:xxx@xx.com)  "
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

          <button type="submit">Reservar</button>

          {/* 🔴 Mensajes de error generales debajo del botón */}
          {isSubmitted && errorMessages.length > 0 && (
            <div id="errores-globales">
              {errorMessages.map((msg, i) => (
                <p key={i}>{msg}</p>
              ))}
            </div>
          )}
        </form>
      </section>
      <section className="blog-nebula">
  <h2>
    <i className="fab fa-instagram" aria-hidden="true"></i> Síguenos en{' '}
    <a href="https://www.instagram.com/nebula-cafe" target="_blank" rel="noopener noreferrer" className="instagram-handle">
      @nebula-cafe
    </a>
  </h2>
  <div className="instagram-grid">
    {/* Nota: Reemplaza los enlaces "#" por los enlaces reales de tus publicaciones de Instagram cuando los tengas */}
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
