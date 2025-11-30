import React, { useState, useEffect } from 'react';
import First from '../organisms/First';
import Footer from '../organisms/Footer';
import AtomButton from '../atoms/AtomButton';
import { resenaService } from '../../services/resenaService'; // Importa el servicio
import "../../styles/Resena.css";

export default function Resenas() {
  const [reseñas, setReseñas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaReseña, setNuevaReseña] = useState({
    nombre: '',
    calificacion: 5,
    resena: '' // Cambié "comentario" por "resena" para que coincida con el backend
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar reseñas del backend al montar el componente
  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      setLoading(true);
      const data = await resenaService.obtenerResenas();
      setReseñas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      setError('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Preparar datos para el backend
      const reseñaData = {
        nombre: nuevaReseña.nombre || "Cliente Anónimo",
        calificacion: parseInt(nuevaReseña.calificacion),
        resena: nuevaReseña.resena
      };

      console.log('Enviando reseña:', reseñaData);

      // Enviar al backend
      const respuesta = await resenaService.crearResena(reseñaData);
      
      console.log('Reseña creada:', respuesta);
      
      // Éxito - actualizar lista
      setEnviado(true);
      setNuevaReseña({
        nombre: '',
        calificacion: 5,
        resena: ''
      });

      // Recargar las reseñas para incluir la nueva
      await cargarResenas();

      // Ocultar formulario después de 3 segundos
      setTimeout(() => {
        setEnviado(false);
        setMostrarFormulario(false);
      }, 3000);

    } catch (error) {
      console.error('Error al enviar reseña:', error);
      setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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

  // Función para formatear fecha (si tu backend incluye fecha)
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha no disponible';
    try {
      const fecha = new Date(fechaString);
      return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return fechaString;
    }
  };

  // Generar avatar basado en el nombre
  const generarAvatar = (nombre) => {
    const avatars = ['👩‍💼', '👨‍💼', '👩‍🎓', '👨‍🎓', '👩‍🍳', '👨‍🍳', '😊', '👍'];
    if (!nombre) return '😊';
    
    // Generar un índice basado en el nombre para consistencia
    const index = nombre.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[index % avatars.length];
  };

  return (
    <>
      
      <div className="resenas-container">
        <div className="resenas-header">
          <h1>Reseñas de Nuestros Clientes</h1>
          <p>Comparte tu experiencia y descubre lo que opinan otros clientes</p>
        </div>

        {/* Mostrar error general */}
        {error && (
          <div className="mensaje-error">
            {error}
          </div>
        )}

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
            disabled={loading}
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
                    disabled={loading}
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
                        disabled={loading}
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
                  <label htmlFor="resena">Tu Reseña *</label>
                  <textarea
                    id="resena"  // Cambiado de "comentario" a "resena"
                    name="resena" // Cambiado de "comentario" a "resena"
                    value={nuevaReseña.resena}
                    onChange={handleInputChange}
                    placeholder="Comparte tu experiencia en Café Nebula..."
                    className="textarea-reseña"
                    rows="4"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <AtomButton 
                  type="submit" 
                  className="btn-enviar-reseña"
                  disabled={loading}
                >
                  {loading ? '⏳ Enviando...' : '📝 Publicar Reseña'}
                </AtomButton>
              </form>
            </div>
          </div>
        )}

        <div className="lista-resenas">
          <h2>Opiniones de Clientes</h2>
          
          {loading ? (
            <div className="cargando">
              <p>Cargando reseñas...</p>
            </div>
          ) : reseñas.length === 0 ? (
            <div className="sin-resenas">
              <p>¡Sé el primero en dejar una reseña!</p>
            </div>
          ) : (
            <div className="resenas-grid">
              {reseñas.map((reseña) => (
                <div key={reseña.id} className="reseña-card">
                  <div className="reseña-header">
                    <div className="reseña-avatar">
                      {generarAvatar(reseña.nombre)}
                    </div>
                    <div className="reseña-info">
                      <h4 className="reseña-nombre">{reseña.nombre}</h4>
                      <span className="reseña-fecha">
                        {reseña.fechaCreacion ? formatearFecha(reseña.fechaCreacion) : 'Fecha reciente'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="reseña-calificacion">
                    {renderEstrellas(reseña.calificacion)}
                  </div>
                  
                  <p className="reseña-comentario">{reseña.resena}</p> {/* Cambiado de "comentario" a "resena" */}
                  
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