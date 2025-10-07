import React from 'react';
import { Link } from 'react-router-dom';
import AtomLink from '../atoms/AtomLink';
import AtomLogo from '../atoms/AtomLogo';
import AtomButton from '../atoms/AtomButton';

export default function First() {
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
            <AtomLink to="/menu">Menú</AtomLink>
            <AtomLink to="/catalogo">Catalogo</AtomLink>
            <AtomLink to ="/resenas">Reseñas</AtomLink>
          </div>
        </div>
        <AtomLink to="/inicio_sesion">
          <AtomButton className="boton-login">Iniciar sesión</AtomButton>
        </AtomLink>
      </nav>
    </section>
  );
}
