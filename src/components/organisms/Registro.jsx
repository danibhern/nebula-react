// components/pages/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AtomButton from "../atoms/AtomButton";
import AtomLink from "../atoms/AtomLink";
import AtomLogo from "../atoms/AtomLogo";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaShieldAlt 
} from 'react-icons/fa';
import '../../styles/Registro.css';

export default function Registro() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        clave: '',
        confirmarClave: ''
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if (isSubmitted) {
            const error = validateField(name, value);
            setFieldErrors(prevErrors => ({
                ...prevErrors,
                [name]: error
            }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'nombre':
                return value.trim().length < 5 ? 'Completar nombre y apellido (mínimo 5 caracteres).' : '';
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? 'Ingrese un correo electrónico válido.' : '';
            case 'telefono':
                return !/^[0-9]{9}$/.test(value)
                    ? 'El teléfono debe tener 9 dígitos.' : '';
            case 'clave':
                return value.length < 6 ? 'La clave debe tener al menos 6 caracteres.' : '';
            case 'confirmarClave':
                return value !== formData.clave ? 'Las claves no coinciden.' : '';
            default:
                return '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const errors = {};
        Object.keys(formData).forEach((key) => {
            errors[key] = validateField(key, formData[key]);
        });
        setFieldErrors(errors);

        const hasErrors = Object.values(errors).some((err) => err !== '');
        if (hasErrors) return;

        // Crear usuario
        const userData = {
            username: formData.email.split('@')[0],
            name: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            role: 'cliente',
            fechaRegistro: new Date().toISOString()
        };

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('user', JSON.stringify(userData));

        alert('¡Registro exitoso! ✅ Bienvenido a Nebula Café');
        navigate('/perfil');
    };

    const errorMessages = Object.values(fieldErrors).filter((e) => e);
    
    return (
        <>
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
                            <AtomLink to="/resenas">Reseñas</AtomLink>
                        </div>
                    </div>
                    <AtomLink to="/inicio_sesion">
                        <AtomButton className="boton-login">Iniciar sesión</AtomButton>
                    </AtomLink>
                </nav>
            </section>

            <div className="registro-container-rosa">
                <div className="registro-fondo-rosa">
                    <section className="registro-card-rosa">
                        {/* Header con logo grande */}
                        <div className="registro-header-rosa">
                            <img src="/img/nebula.png" alt="Nebula Café" className="logo-grande-rosa" />
                            <h1>Únete a Nebula Café</h1>
                            <p>Crea tu cuenta y descubre el universo del café</p>
                        </div>

                        <form onSubmit={handleSubmit} className="registro-form-rosa">
                            <div className="form-group-rosa">
                                <div className="input-container-rosa">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder=" "
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className={fieldErrors.nombre ? 'input-rosa input-error-rosa' : 'input-rosa'}
                                    />
                                    <label className="floating-label-rosa">Nombre Completo</label>
                                </div>
                                {fieldErrors.nombre && <span className="error-message-rosa">{fieldErrors.nombre}</span>}
                            </div>

                            <div className="form-group-rosa">
                                <div className="input-container-rosa">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder=" "
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={fieldErrors.email ? 'input-rosa input-error-rosa' : 'input-rosa'}
                                    />
                                    <label className="floating-label-rosa">Correo Electrónico</label>
                                </div>
                                {fieldErrors.email && <span className="error-message-rosa">{fieldErrors.email}</span>}
                            </div>

                            <div className="form-group-rosa">
                                <div className="input-container-rosa">
                                    <input
                                        type="tel"
                                        name="telefono"
                                        placeholder=" "
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className={fieldErrors.telefono ? 'input-rosa input-error-rosa' : 'input-rosa'}
                                    />
                                    <label className="floating-label-rosa">Teléfono</label>
                                </div>
                                {fieldErrors.telefono && <span className="error-message-rosa">{fieldErrors.telefono}</span>}
                            </div>

                            <div className="form-group-rosa">
                                <div className="input-container-rosa">
                                    <input
                                        type="password"
                                        name="clave"
                                        placeholder=" "
                                        value={formData.clave}
                                        onChange={handleChange}
                                        className={fieldErrors.clave ? 'input-rosa input-error-rosa' : 'input-rosa'}
                                    />
                                    <label className="floating-label-rosa">Contraseña</label>
                                </div>
                                {fieldErrors.clave && <span className="error-message-rosa">{fieldErrors.clave}</span>}
                            </div>

                            <div className="form-group-rosa">
                                <div className="input-container-rosa">
                                    <input
                                        type="password"
                                        name="confirmarClave"
                                        placeholder=" "
                                        value={formData.confirmarClave}
                                        onChange={handleChange}
                                        className={fieldErrors.confirmarClave ? 'input-rosa input-error-rosa' : 'input-rosa'}
                                    />
                                    <label className="floating-label-rosa">Confirmar Contraseña</label>
                                </div>
                                {fieldErrors.confirmarClave && <span className="error-message-rosa">{fieldErrors.confirmarClave}</span>}
                            </div>

                            <button type="submit" className="btn-registro-rosa">
                                Crear Mi Cuenta
                                <span className="btn-icon-rosa">✨</span>
                            </button>

                            {isSubmitted && errorMessages.length > 0 && (
                                <div className="errores-globales-rosa">
                                    <div className="error-icon-rosa">⚠️</div>
                                    <div>
                                        <h4>Corrige estos errores:</h4>
                                        {errorMessages.map((msg, i) => (
                                            <p key={i}>{msg}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="registro-footer-rosa">
                                <p>¿Ya tienes cuenta? <Link to="/inicio_sesion" className="link-login-rosa">Iniciar Sesión</Link></p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>

            <footer>
                <div className="footer-section">
                    <h3>Redes Sociales</h3>
                    <ul>
                        <li><a href="#" aria-label="Facebook"><FaFacebookF /> Facebook</a></li>
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
                        <li><a href="#"><FaFileAlt /> Políticas de Envío</a></li>
                        <li><a href="#"><FaShieldAlt /> Términos y Condiciones</a></li>
                    </ul>
                </div>
            </footer>
        </>
    );
}