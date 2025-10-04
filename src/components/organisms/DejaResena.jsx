import React, { useEffect, useState } from "react";
import "../../styles/Resena.css";

function DejaResena() {
  const [resenas, setResenas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [rating, setRating] = useState(0); // ⭐ Calificación

  // Cargar reseñas desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("resenas");
    if (stored) {
      setResenas(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("resenas", JSON.stringify(resenas));
  }, [resenas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || comentario.trim() === "" || rating === 0) {
      alert("Debe completar todos los campos y seleccionar una calificación.");
      return;
    }

    const nuevaResena = {
      id: Date.now(),
      nombre,
      comentario,
      rating,
    };

    setResenas([nuevaResena, ...resenas]);
    setNombre("");
    setComentario("");
    setRating(0);
  };

  return (
    <div className="resenas-container">
      <h2>Deja tu reseña </h2>

      <form onSubmit={handleSubmit} className="resena-form">
        {/* Nombre */}
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* ⭐ Calificación arriba del comentario */}
        <div className="rating-radio">
          {[5, 4, 3, 2, 1].map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              <span>★</span>
            </label>
          ))}
        </div>

        {/* Comentario */}
        <textarea
          placeholder="Escribe tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <button type="submit">Enviar reseña</button>
      </form>

      <h3>Reseñas</h3>
      {resenas.length === 0 ? (
        <p className="sin-resenas">No hay reseñas todavía</p>
      ) : (
        resenas.map((r) => (
          <div key={r.id} className="resena-card">
            <strong>{r.nombre}</strong>
            <div className="rating-display">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </div>
            <p>{r.comentario}</p>
          </div>
        ))
      )}
    </div>
    
  );
}

export default DejaResena;
