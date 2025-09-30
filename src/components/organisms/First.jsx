import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default function First() {
  return (
    <section id="first">
    <nav>
      <div className="logo"></div>
        <HashLink smooth to="#first">Home</HashLink>
        <HashLink smooth to="#second">Quienes Somos</HashLink>
      </nav>
    </section>
  );
}
