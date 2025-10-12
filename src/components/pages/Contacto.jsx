import React, { useState } from 'react';
import First from '../organisms/First';
import Footer from '../organisms/Footer';
import AtomButton from '../atoms/AtomButton';
import "../../styles/Contacto.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    
    setMensajeEnviado(true);
    
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    });

    setTimeout(() => {
      setMensajeEnviado(false);
    }, 5000);
  };

  return (
    <>
      <First />
      
      <div className="contacto-container-rosa">
        <div className="contacto-header-rosa">
          <h1>Contáctanos</h1>
          <p>¿Tienes alguna pregunta o comentario? Nos encantaría escucharte</p>
        </div>

        <div className="contacto-content-rosa">
          <div className="contacto-form-rosa">
            <h2>Envíanos un Mensaje</h2>
            
            {mensajeEnviado && (
              <div className="mensaje-exito-rosa">
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group-rosa">
                <label htmlFor="nombre">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="input-contacto-rosa"
                  required
                />
              </div>

              <div className="form-row-rosa">
                <div className="form-group-rosa">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-contacto-rosa"
                    required
                  />
                </div>

                <div className="form-group-rosa">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="input-contacto-rosa"
                  />
                </div>
              </div>

              <div className="form-group-rosa">
                <label htmlFor="asunto">Asunto *</label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="select-contacto-rosa"
                  required
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="pedido">Información de Pedidos</option>
                  <option value="producto">Información de Productos</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="form-group-rosa">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="textarea-contacto-rosa"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
              </div>

              <AtomButton type="submit" className="btn-enviar-rosa">
                📧 Enviar Mensaje
              </AtomButton>
            </form>
          </div>
        </div>

        <div className="mapa-section-rosa">
          <h2>Encuéntranos</h2>
          <div className="mapa-container-rosa">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.515267911576!2d-70.99130292478728!3d-33.51138287334125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0718b8818c5%3A0x5c2cba8d1e6e3d1a!2sCalle%20Serrano%201105%2C%20Melipilla%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '25px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Café Nebula - Sucursal Melipilla"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}