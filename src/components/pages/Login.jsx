import React from 'react';
import { useNavigate } from 'react-router-dom';
import InicioSesion from '../organisms/InicioSesion';
import AtomLink from '../atoms/AtomLink';
import AtomLogo from '../atoms/AtomLogo';
import AtomButton from '../atoms/AtomButton';
import '../../styles/Login.css';

export default function LoginPage({ auth }) {
    const navigate = useNavigate();

    const handleLoginSubmit = async (username, password) => {
  try {
    const userData = await auth.login(username, password);

    const roles = (userData.roles || []).map(r => r.name || r);

    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userRoles', JSON.stringify(roles));

    if (roles.includes('ROLE_ADMIN')) {
      navigate('/admin', { replace: true });
    } else if (roles.includes('ROLE_EMPLOYEE')) {
      navigate('/emp1', { replace: true });
    } else {
      navigate('/perfil', { replace: true });
    }

  } catch (error) {
    alert('Credenciales inválidas');
  }
};

    return (
        <>
            <nav>
                <div className="barra-nav">
                    <div className="logo"><AtomLogo /></div>
                    <div className="nav-links">
                        <AtomLink to="/">Home</AtomLink>
                        <AtomLink to="/about">Quienes Somos</AtomLink>
                        <AtomLink to="/catalogo">Catalogo</AtomLink>
                        <AtomLink to="/resenas">Reseñas</AtomLink>
                        <AtomLink to="/contacto">Contacto</AtomLink>
                    </div>
                </div>

                {auth.isAuthenticated ? (
                    <AtomButton onClick={auth.logout} className="boton-login">Cerrar Sesión</AtomButton>
                ) : (
                    <AtomLink to="/inicio_sesion">
                        <AtomButton className="boton-login">Iniciar Sesión</AtomButton>
                    </AtomLink>
                )}
            </nav>

            <InicioSesion onLogin={handleLoginSubmit} />
        </>
    );
}
