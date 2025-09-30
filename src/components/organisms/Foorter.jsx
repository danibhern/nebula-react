import React from 'react';

export default function Reserva_Form() {
    return(
          <footer>
    <div className="footer-section">
      <h3>Redes Sociales</h3>
      <ul>
        <li><a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i> Facebook</a></li>
        <li><a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i> Instagram</a></li>
        <li><a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i> Twitter</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Sucursales</h3>
      <ul>
        <li><a href="https://www.google.com/maps/search/?api=1&query=Calle+Serrano+1105,+Melipilla" target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps"><i className="fas fa-map-marker-alt"></i> Calle Serrano 1105, Melipilla</a></li>
        <li><i className="fas fa-map-marker-alt"></i> Avenida Central 456, Villarica</li>
        <li><i className="fas fa-map-marker-alt"></i> Bulevar 789, Copiapó</li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Políticas</h3>
      <ul>
        <li><a href="#"><i className="fas fa-file-alt"></i> Políticas de Envío</a></li>
        <li><a href="#"><i className="fas fa-shield-alt"></i> Términos y Condiciones</a></li>
      </ul>
    </div>
  </footer>
    );
}