import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default function Reserva_Form() {
  return (
    <section className="contenedor-reserva-blog">
    <section className="reservacion">
      <h2>Reserva tu mesa</h2>
      <form action="#" id="form">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" required />
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" name="fecha" required />
        <label for="hora">Hora:</label>
        <select id="hora" name="hora" required>
          <option value="" disabled selected>Seleccione hora</option>
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
        <div id="errores"></div>
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
  );
}