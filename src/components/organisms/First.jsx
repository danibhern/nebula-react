import React from 'react';
import { Link } from 'react-router-dom';
import AtomLink from '../atoms/AtomLink';
import AtomLogo from '../atoms/AtomLogo';
import AtomButton from '../atoms/AtomButton';

export default function First({ auth }) {
  // fallback: determine authentication from prop or from localStorage
  const localToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const isAuthenticated = (auth && auth.isAuthenticated) || !!localToken;

  const handleLogout = () => {
    if (auth && typeof auth.logout === 'function') {
      auth.logout();
      return;
    }
    // fallback logout: remove local keys and reload to reflect state
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRoles');
    } catch (e) {
      // ignore
    }
    // redirect to home
    window.location.href = '/';
  };

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
        {isAuthenticated ? (
          <AtomButton className="boton-login" onClick={handleLogout}>Cerrar sesión</AtomButton>
        ) : (
          <AtomLink to="/inicio_sesion">
            <AtomButton className="boton-login">Iniciar sesión</AtomButton>
          </AtomLink>
        )}
      </nav>
    </section>
  );
}
