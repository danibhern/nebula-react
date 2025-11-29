import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';  
import InicioSesion from '../organisms/InicioSesion'; 
import AtomLink from '../atoms/AtomLink';
import AtomLogo from '../atoms/AtomLogo';
import AtomButton from '../atoms/AtomButton';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

// El componente ahora acepta la prop 'auth'
export default function LoginPage({ auth }) { 
    
    const navigate = useNavigate();

    // Función que maneja el submit y la redirección basada en roles
    const handleLoginSubmit = async (username, password) => {
        try {
            // Llama a la función de login del estado global (App.jsx)
            const userData = await auth.login(username, password);

            // Obtener roles de la respuesta o fallback a localStorage (por seguridad)
            let roles = userData?.roles;
            if (!roles || roles.length === 0) {
                try {
                    roles = JSON.parse(localStorage.getItem('userRoles')) || [];
                } catch (e) {
                    roles = [];
                }
            }

            // Normalizar: manejar casos donde el backend devuelva 'ADMIN' en vez de 'ROLE_ADMIN'
            const hasAdmin = roles.some(r => /ROLE_ADMIN|ADMIN/i.test(r));
            const hasEmployee = roles.some(r => /ROLE_EMPLOYEE|EMPLOYEE/i.test(r));

            if (hasAdmin) {
                console.log('LoginPage: detected roles ->', roles);
                console.log('LoginPage: navigating to /admin (full reload)');
                // Forzar navegación completa para evitar race-conditions con el estado global
                setTimeout(() => { window.location.href = '/admin'; }, 0);
                return;
            }
            if (hasEmployee) {
                console.log('LoginPage: detected roles ->', roles);
                console.log('LoginPage: navigating to /emp1 (full reload)');
                setTimeout(() => { window.location.href = '/emp1'; }, 0);
                return;
            }

            // Por defecto, ir al perfil (recarga completa)
            setTimeout(() => { window.location.href = '/perfil'; }, 0);

        } catch (error) {
            // Propagamos el error al formulario para que muestre el mensaje
            if (error && error.status === 401) {
                 throw new Error("Credenciales inválidas. Inténtalo de nuevo.");
            }
            throw error;
        }
    };

    return (
        <>
            {/* Navbar con lógica condicional para Iniciar Sesión/Cerrar Sesión */}
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
                {/* Botón de LOGIN / LOGOUT condicional (Requisito 6) */}
                {auth.isAuthenticated ? (
                    <AtomButton onClick={auth.logout} className="boton-login">Cerrar Sesión</AtomButton>
                ) : (
                    <AtomLink to="/inicio_sesion">
                        <AtomButton className="boton-login">Iniciar Sesión</AtomButton>
                    </AtomLink>
                )}
            </nav>

            {/* Componente del formulario, ahora recibe la función de submit */}
            <InicioSesion onLogin={handleLoginSubmit} /> 

            {/* Footer */}
            <footer>
                <div className="footer-section">
                    <h3>Redes Sociales</h3>
                    <ul>
                        <li><a href="https://facebook.com/nebula-cafe" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /> Facebook</a></li>
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
                        <li><a href="/politicas-envio"><FaFileAlt /> Políticas de Envío</a></li>
                        <li><a href="#"><FaShieldAlt /> Términos y Condiciones</a></li>
                    </ul>
                </div>
            </footer>
        </>
    );
}