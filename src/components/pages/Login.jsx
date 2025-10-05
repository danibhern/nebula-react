import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <>
      <nav>
        <div className="barra-nav">
          <div className="logo">
            <img src="/images/nebula.png" alt="nebula" />
          </div>
          <div className="nav-links">
            <a href="/index.html">Home</a>
            <a href="#">Quienes Somos</a>
            <a href="/menu-nebula.pdf" target="_blank" rel="noopener noreferrer">Menú</a>
            <a href="/pedido.html">Pedidos</a>
          </div>
        </div>
        <a href="/inicio_sesion.html">
          <button className="boton-login">Iniciar sesión</button>
        </a>
      </nav>

      <main>
        <section id="container">
          <img src="/images/nebula.png" alt="Logo Nebula Café" className="logo-ini" />
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <label htmlFor="nombre">Usuario</label>
              <input type="text" name="nombre" id="nombre" placeholder="Usuario" />
            </div>
            <div className="row">
              <label htmlFor="email">Contraseña</label>
              <input type="password" name="email" id="email" placeholder="Contraseña" />
            </div>
            <button type="submit">Iniciar Sesion</button>
            <div className="links-container">
              <a href="/registro.html">Registrarse</a>
              <a href="/olvido_contraseña.html">Olvidé mi contraseña</a>
            </div>
          </form>
        </section>
      </main>

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
    </>
  );
}
