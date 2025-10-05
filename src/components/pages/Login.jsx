import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
import AtomLink from '../atoms/AtomLink';
import AtomButton from '../atoms/AtomButton';
import '../../styles/Login.css';  



export default function LoginPage() {
  const handleSubmit = e => {
    e.preventDefault();
    // Lógica para autenticar
  };

  return (
    <>
      <nav>
        <div className="barra-nav">
          <div className="logo">
            <img src="/img/nebula.png" alt="nebula" />
          </div>
          <div className="nav-links">
            <AtomLink to="/">Home</AtomLink>
            <AtomLink to="/about">Quienes Somos</AtomLink>
            <AtomLink to="/menu">Menú</AtomLink>
            <AtomLink to="/pedidos">Pedidos</AtomLink>
          </div>
        </div>
        <AtomLink to="/inicio_sesion">
          <AtomButton className="boton-login">Iniciar sesión</AtomButton>
        </AtomLink>
      </nav>

      <main>
        <section id="container">
          <img src="/img/nebula.png" alt="Logo Nebula Café" className="logo-ini" />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="nombre">Usuario</label>
              <input type="text" name="nombre" id="nombre" placeholder="Usuario" />
            </div>
            <div className="row">
              <label htmlFor="email">Contraseña</label>
              <input type="password" name="email" id="email" placeholder="Contraseña" />
            </div>
            <AtomButton type="submit">Iniciar Sesion</AtomButton>
            <div className="links-container">
              <AtomLink to="/registro">Registrarse</AtomLink>
              <AtomLink to="/olvido_contraseña">Olvidé mi contraseña</AtomLink>
            </div>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul>
            <li><AtomLink to="#" aria-label="Facebook"><FaFacebookF /> Facebook</AtomLink></li>
            <li><AtomLink to="#" aria-label="Instagram"><FaInstagram /> Instagram</AtomLink></li>
            <li><AtomLink to="#" aria-label="Twitter"><FaTwitter /> Twitter</AtomLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Sucursales</h3>
          <ul>
            <li>
              <AtomLink to="https://www.google.com/maps/search/?api=1&query=Calle+Serrano+1105,+Melipilla" target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps">
                <FaMapMarkerAlt /> Calle Serrano 1105, Melipilla
              </AtomLink>
            </li>
            <li><FaMapMarkerAlt /> Avenida Central 456, Villarica</li>
            <li><FaMapMarkerAlt /> Bulevar 789, Copiapó</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Políticas</h3>
          <ul>
            <li><AtomLink to="#"><FaFileAlt /> Políticas de Envío</AtomLink></li>
            <li><AtomLink to="#"><FaShieldAlt /> Términos y Condiciones</AtomLink></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
