import React, { useState } from 'react';
import First from '../organisms/First';
import Footer from '../organisms/Footer';
import AtomButton from '../atoms/AtomButton';
import "../../styles/Resena.css";

const reseñasEjemplo = [
  {
    id: 1,
    nombre: "Yesenia Jara",
    fecha: "2024-01-15",
    calificacion: 5,
    comentario: "¡El mejor café que he probado! El ambiente es acogedor y el servicio excepcional. Volveré seguro.",
    avatar: "👩‍💼"
  },
  {
    id: 2,
    nombre: "Pablo Martinez",
    fecha: "2024-01-12",
    calificacion: 4,
    comentario: "Muy buen café y pasteles deliciosos. El personal es muy amable. Recomendado.",
    avatar: "👨‍💼"
  },
  {
    id: 3,
    nombre: "Daniela Barrera",
    fecha: "2024-01-10",
    calificacion: 5,
    comentario: "Me encanta el café especial que sirven aquí. Perfecto para trabajar o reunirse con amigos.",
    avatar: "👩‍🎓"
  }
];

export default function Resenas() {
  const [reseñas, setReseñas] = useState(reseñasEjemplo);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaReseña, setNuevaReseña] = useState({
    nombre: '',
    calificacion: 5,
    comentario: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaReseña(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalificacionClick = (puntos) => {
    setNuevaReseña(prev => ({
      ...prev,
      calificacion: puntos
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reseñaCompleta = {
      id: reseñas.length + 1,
      nombre: nuevaReseña.nombre || "Cliente Anónimo",
      fecha: new Date().toISOString().split('T')[0],
      calificacion: parseInt(nuevaReseña.calificacion),
      comentario: nuevaReseña.comentario,
      avatar: "😊"
    };

    setReseñas(prev => [reseñaCompleta, ...prev]);
    setEnviado(true);
    setNuevaReseña({
      nombre: '',
      calificacion: 5,
      comentario: ''
    });

    setTimeout(() => {
      setEnviado(false);
      setMostrarFormulario(false);
    }, 3000);
  };

  const calcularPromedio = () => {
    if (reseñas.length === 0) return 0;
    const suma = reseñas.reduce((acc, reseña) => acc + reseña.calificacion, 0);
    return (suma / reseñas.length).toFixed(1);
  };

  const renderEstrellas = (calificacion) => {
    return (
      <div className="estrellas">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <span
            key={estrella}
            className={`estrella ${estrella <= calificacion ? 'activa' : ''}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      
      <div className="resenas-container">
        <div className="resenas-header">
          <h1>Reseñas de Nuestros Clientes</h1>
          <p>Comparte tu experiencia y descubre lo que opinan otros clientes</p>
        </div>


        <div className="resenas-stats">
          <div className="stat-card">
            <div className="stat-number">{reseñas.length}</div>
            <div className="stat-label">Reseñas Totales</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{calcularPromedio()}</div>
            <div className="stat-label">Calificación Promedio</div>
            <div className="estrellas-pequenas">
              {renderEstrellas(Math.round(calcularPromedio()))}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {reseñas.filter(r => r.calificacion === 5).length}
            </div>
            <div className="stat-label">Reseñas 5 Estrellas</div>
          </div>
        </div>

        <div className="agregar-reseña-section">
          <AtomButton 
            className="btn-agregar-reseña"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? '✕ Cancelar' : '✍️ Escribir Mi Reseña'}
          </AtomButton>
        </div>

        {mostrarFormulario && (
          <div className="formulario-reseña">
            <div className="formulario-card">
              <h3>Comparte Tu Experiencia</h3>
              
              {enviado && (
                <div className="mensaje-exito">
                  ¡Gracias por tu reseña! Tu opinión ha sido publicada.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Tu Nombre (Opcional)</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nuevaReseña.nombre}
                    onChange={handleInputChange}
                    placeholder="¿Cómo te llamas?"
                    className="input-reseña"
                  />
                </div>

                <div className="form-group">
                  <label>Tu Calificación</label>
                  <div className="selector-calificacion">
                    {[1, 2, 3, 4, 5].map((puntos) => (
                      <button
                        key={puntos}
                        type="button"
                        className={`puntuacion-btn ${
                          puntos === nuevaReseña.calificacion ? 'seleccionada' : ''
                        }`}
                        onClick={() => handleCalificacionClick(puntos)}
                      >
                        <span className="estrella-btn">
                          {puntos <= nuevaReseña.calificacion ? '⭐' : '☆'}
                        </span>
                        <span className="numero-puntos">{puntos}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comentario">Tu Reseña *</label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    value={nuevaReseña.comentario}
                    onChange={handleInputChange}
                    placeholder="Comparte tu experiencia en Café Nebula..."
                    className="textarea-reseña"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <AtomButton type="submit" className="btn-enviar-reseña">
                  Publicar Reseña
                </AtomButton>
              </form>
            </div>
          </div>
        )}

        <div className="lista-resenas">
          <h2>Opiniones de Clientes</h2>
          
          {reseñas.length === 0 ? (
            <div className="sin-resenas">
              <p>¡Sé el primero en dejar una reseña!</p>
            </div>
          ) : (
            <div className="resenas-grid">
              {reseñas.map((reseña) => (
                <div key={reseña.id} className="reseña-card">
                  <div className="reseña-header">
                    <div className="reseña-avatar">
                      {reseña.avatar}
                    </div>
                    <div className="reseña-info">
                      <h4 className="reseña-nombre">{reseña.nombre}</h4>
                      <span className="reseña-fecha">{reseña.fecha}</span>
                    </div>
                  </div>
                  
                  <div className="reseña-calificacion">
                    {renderEstrellas(reseña.calificacion)}
                  </div>
                  
                  <p className="reseña-comentario">{reseña.comentario}</p>
                  
                  <div className="reseña-acciones">
                    <button className="btn-accion">👍 Útil</button>
                    <button className="btn-accion">💬 Responder</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}