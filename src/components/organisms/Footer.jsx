import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <h3>Redes Sociales</h3>
        <ul>
          <li><a href="#" aria-label="Facebook"><FaFacebookF /> Facebook</a></li>
          <li><a href="#" aria-label="Instagram"><FaInstagram /> Instagram</a></li>
          <li><a href="#" aria-label="Twitter"><FaTwitter /> Twitter</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Sucursales</h3>
        <ul>
          <li>
            <a href="https://www.google.com/maps/search/?api=1&query=Calle+Serrano+1105,+Melipilla" target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps">
              <FaMapMarkerAlt /> Calle Serrano 1105, Melipilla
            </a>
          </li>
          <li><FaMapMarkerAlt /> Avenida Central 456, Villarica</li>
          <li><FaMapMarkerAlt /> Bulevar 789, Copiapó</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Políticas</h3>
        <ul>
          <li><a href="#"><FaFileAlt /> Políticas de Envío</a></li>
          <li><a href="#"><FaShieldAlt /> Términos y Condiciones</a></li>
        </ul>
      </div>
    </footer>
  );
}
