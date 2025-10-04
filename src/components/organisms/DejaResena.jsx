import React, { useEffect, useState } from "react";
import "../../styles/Resena.css";

function DejaResena() {
  const [resenas, setResenas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");

  // Cargar reseñas desde localStorage al inicio
  useEffect(() => {
    const stored = localStorage.getItem("resenas"); // mismo nombre clave
    if (stored) {
      setResenas(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cada vez que cambien las reseñas
  useEffect(() => {
    localStorage.setItem("resenas", JSON.stringify(resenas));
  }, [resenas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || comentario.trim() === "") {
      alert("Debe completar todos los campos.");
      return;
    }

    const nuevaResena = {
      id: Date.now(),
      nombre,
      comentario,
    };

    setResenas([nuevaResena, ...resenas]);
    setNombre("");
    setComentario("");
  };

  return (
    <div className="resenas-container">
      <h2>Deja tu reseña </h2>

      <form onSubmit={handleSubmit} className="resena-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
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
            <p>{r.comentario}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default DejaResena;
