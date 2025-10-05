import React, { useState } from 'react';
// Removed unused HashLink import. If you need it elsewhere, add it back.

export default function Reserva_Form() {
  // State for form data - Fixed the 'horra' typo to 'hora'
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '', // Corrected from 'horra'
  });

  // State for field errors - Fixed the typo from 'fielErrors' to 'fieldErrors'
  const [fieldErrors, setFieldErrors] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        return value.length <= 3 ? 'Completar campo con nombre y apellido.' : ''; // Fixed character check logic
      case 'email':
        return !value.includes('@') ? 'El campo email debe contener @.' : '';
      case 'telefono':
        return value.length !== 9 ? 'El campo teléfono debe contener 9 dígitos.' : '';
      case 'fecha':
        return !value ? 'Debe seleccionar una fecha.' : '';
      case 'hora':
        return !value ? 'Debe seleccionar una hora para su reserva.' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (isSubmitted) {
      const error = validateField(name, value);
      setFieldErrors(prevErrors => ({
        ...prevErrors,
        [name]: error
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setFieldErrors(newErrors);

    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      return;
    }

  
    console.log('Form data submitted:', formData);
    
  };
  const errorMessages = Object.values(fieldErrors).filter(error => error !== '');

  return (
    <>
      <section className="contenedor-reserva-blog">
        <section className="reservacion">
          <h2>Reserva tu mesa</h2>
      
          <form onSubmit={handleSubmit} id="form">
          
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={fieldErrors.nombre ? 'error' : ''}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldErrors.email ? 'error' : ''}
              required
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={fieldErrors.telefono ? 'error' : ''}
              required
            />

            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className={fieldErrors.fecha ? 'error' : ''}
              required
            />

            <label htmlFor="hora">Hora:</label>
            <select
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className={fieldErrors.hora ? 'error' : ''}
              required
            >
              <option value="" disabled>Seleccione hora</option>
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

            {isSubmitted && errorMessages.length > 0 && (
              <div id="errores">
                {errorMessages.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </div>
            )}
          </form>
        </section>
        <section className="blog-nebula">
        <h2><i className="fab fa-instagram" aria-hidden="true"></i> Síguenos en <a href="https://www.instagram.com/nebula-cafe" target="_blank" rel="noopener noreferrer" className="instagram-handle">@nebula-cafe</a></h2>
        <div className="instagram-grid">
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO05Pqzb_Xf_U6Mcx2vX-wRpNRrAwfvUTGug&s" alt="Instagram photo 1" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQln2k7AzZua3qO5IdumU4J9a6AUCCwEwSItg&s" alt="Instagram photo 2" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-8JXSmxNW0XYMylsLxEL67vNc0wbjovBm8Q&s" alt="Instagram photo 3" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJl4G18Lak8Plldc7voWIv24P2HhnZVFSZGg&s" alt="Instagram photo 4" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbWYr-6mpNxooSq_jiU1Gw-ZNDOJBYK1P_g&s" alt="Instagram photo 5" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw5GSwk-vinyGtyekbrZVsKZ1RNiLgXoOk5g&s" alt="Instagram photo 6" /></a>
        </div>
      </section>
      </section>

    </>
  );
}