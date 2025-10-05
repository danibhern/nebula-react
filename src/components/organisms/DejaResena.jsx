import React, { useEffect, useState } from "react";
import "../../styles/Resena.css"; // Asegúrate de que la ruta es correcta

// Componente para las estrellas de calificación
const StarRating = ({ rating, setRating, error }) => {
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div className="star-rating">
      <label>Tu Calificación *</label>
      {error && <span className="error"> {error}</span>}
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            className={`star ${star <= (hoverValue || rating) ? "filled" : ""}`}
            onClick={() => setRating(star)}
            onMouseOver={() => handleMouseOver(star)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente principal DejaResena
export default function DejaResena() {
  const [resenas, setResenas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  // Cargar reseñas desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem("resenas");
    if (stored) {
      setResenas(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cuando las reseñas cambien
  useEffect(() => {
    localStorage.setItem("resenas", JSON.stringify(resenas));
  }, [resenas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!comentario.trim()) newErrors.comentario = "El comentario es obligatorio";
    if (rating === 0) newErrors.rating = "Selecciona una calificación";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    const nuevaResena = {
      id: Date.now(),
      nombre,
      comentario,
      rating,
      fecha: new Date().toLocaleDateString()
    };

    setResenas([nuevaResena, ...resenas]);
    setNombre("");
    setComentario("");
    setRating(0);
  };

  return (
    <div className="resenas-container">
      <h2>Comparte tu Experiencia Rosa </h2>
      
      <form onSubmit={handleSubmit} className="resena-form">
        <div className="form-group">
          <label>Tu nombre *</label>
          <input
            type="text"
            placeholder="¿Cómo te llamas?"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={errors.nombre ? "error-field" : ""}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>

        <StarRating 
          rating={rating} 
          setRating={setRating}
          error={errors.rating}
        />

        <div className="form-group">
          <label>Tu experiencia *</label>
          <textarea
            placeholder="Cuéntanos qué te pareció la cafetería, el ambiente, el café..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows="4"
            className={errors.comentario ? "error-field" : ""}
          />
          {errors.comentario && <span className="error">{errors.comentario}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Publicar Reseña ✨
        </button>
      </form>

      <div className="resenas-list">
        <h3>Lo que dicen nuestros visitantes</h3>
        {resenas.length === 0 ? (
          <p className="sin-resenas">Sé el primero en dejar una reseña 🌟</p>
        ) : (
          resenas.map((r) => (
            <div key={r.id} className="resena-card">
              <div className="resena-header">
                <strong>{r.nombre}</strong>
                <span className="fecha">{r.fecha}</span>
              </div>
              <div className="rating-display">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                <span className="rating-text">({r.rating}/5)</span>
              </div>
              <p>{r.comentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}