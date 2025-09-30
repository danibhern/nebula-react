import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default function First() {
  return (
    <section id="first">
      <nav>
        <div className="logo">
          <img src="/img/nebula.png" alt="Nebula" />
        </div>
        <HashLink smooth to="#first">Home</HashLink>
        <HashLink smooth to="#second">Quienes Somos</HashLink>
        <HashLink smooth to="#second">Menu</HashLink>
        <HashLink smooth to="#second">Pedidos</HashLink>
      </nav>
    </section>
  );
}
