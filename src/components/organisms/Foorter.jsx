import React from 'react';

export default function Reserva_Form() {
    return(
          <footer>
    <div class="footer-section">
      <h3>Redes Sociales</h3>
      <ul>
        <li><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i> Facebook</a></li>
        <li><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i> Instagram</a></li>
        <li><a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i> Twitter</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Sucursales</h3>
      <ul>
        <li><a href="https://www.google.com/maps/search/?api=1&query=Calle+Serrano+1105,+Melipilla" target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps"><i class="fas fa-map-marker-alt"></i> Calle Serrano 1105, Melipilla</a></li>
        <li><i class="fas fa-map-marker-alt"></i> Avenida Central 456, Villarica</li>
        <li><i class="fas fa-map-marker-alt"></i> Bulevar 789, Copiapó</li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Políticas</h3>
      <ul>
        <li><a href="#"><i class="fas fa-file-alt"></i> Políticas de Envío</a></li>
        <li><a href="#"><i class="fas fa-shield-alt"></i> Términos y Condiciones</a></li>
      </ul>
    </div>
  </footer>
    );
}