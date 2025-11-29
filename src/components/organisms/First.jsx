import React from 'react';
import { Link } from 'react-router-dom';
import AtomLink from '../atoms/AtomLink';
import AtomLogo from '../atoms/AtomLogo';
import AtomButton from '../atoms/AtomButton';

export default function First({ auth }) {
  return (
    <section id="first">
      <nav>
        <div className="barra-nav">
          <div className="logo">
              <AtomLogo />
          </div>
          <div className="nav-links">
            <AtomLink to="/">Home</AtomLink>
            <AtomLink to="/about">Quienes Somos</AtomLink>
            <AtomLink to="/catalogo">Catalogo</AtomLink>
            <AtomLink to ="/resenas">Reseñas</AtomLink>
            <AtomLink to="/contacto">Contacto</AtomLink>
          </div>
        </div>
        {/* Mostrar botón de Login o Logout según estado de autenticación */}
        {auth && auth.isAuthenticated ? (
          <AtomButton className="boton-login" onClick={auth.logout}>Cerrar sesión</AtomButton>
        ) : (
          <AtomLink to="/inicio_sesion">
            <AtomButton className="boton-login">Iniciar sesión</AtomButton>
          </AtomLink>
        )}
      </nav>
    </section>
  );
}
