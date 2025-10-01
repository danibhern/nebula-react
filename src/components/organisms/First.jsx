import React from 'react';
import { Link } from 'react-router-dom';

export default function First() {
  return (
    <section id="first">
      <nav>
        <div className="barra-nav">
          <div className="logo">
            <img src="/img/nebula.png" alt="nebula" />
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">Quienes Somos</Link>
            <Link to="/menu">Menú</Link>
            <Link to="/pedidos">Pedidos</Link>
          </div>
        </div>
        <Link to="/inicio_sesion">
          <button className="boton-login">Iniciar sesión</button>
        </Link>
      </nav>
    </section>
  );
}
