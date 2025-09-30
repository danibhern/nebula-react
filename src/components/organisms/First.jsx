import React from 'react';
import { HashLink } from 'react-router-hash-link';
import nebulaImg from '../img/nebula.png'; // ajusta la ruta si es necesario

export default function First() {
  return (
    <section id="first">
      <nav>
        <div className="logo">
          <img src={nebulaImg} alt="Nebula" />
        </div>
        <HashLink smooth to="#first">Home</HashLink>
        <HashLink smooth to="#second">Quienes Somos</HashLink>
      </nav>
    </section>
  );
}
