// components/pages/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AtomButton from "../atoms/AtomButton";
import AtomLink from "../atoms/AtomLink";
//import '../../styles/Registro.css';

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

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        // Validación en tiempo real
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
                    ? 'Ingrese un correo electrónico válido (ej: ejemplo@dominio.com).'
                    : '';
            case 'telefono':
                return !/^[0-9]{9}$/.test(value)
                    ? 'El teléfono debe tener 9 dígitos (solo números).'
                    : '';
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

        // Crear usuario y guardar en localStorage
        const userData = {
            username: formData.email.split('@')[0],
            name: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            role: 'cliente',
            fechaRegistro: new Date().toISOString()
        };

        // Guardar usuario en localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        // También guardar como usuario actual
        localStorage.setItem('user', JSON.stringify(userData));

        console.log('Usuario registrado con éxito:', userData);
        alert('¡Registro exitoso! ✅ Bienvenido a Nebula Café');

        // Redirigir al perfil
        navigate('/perfil');
    };

    // Mensajes de error
    const errorMessages = Object.values(fieldErrors).filter((e) => e);
    
    return (
        <div className="registro-container">
            <section className="contenedor-registro">
                <section className="registro-form">
                    <div className="registro-header">
                        <img src="/img/nebula.png" alt="Logo Nebula Café" className="logo-registro" />
                        <h2>Crear Cuenta</h2>
                        <p>Únete a la familia Nebula Café</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Tu nombre y apellido"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={fieldErrors.nombre ? 'input-error' : ''}
                            />
                            {fieldErrors.nombre && <span className="error-message">{fieldErrors.nombre}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ejemplo@dominio.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={fieldErrors.email ? 'input-error' : ''}
                            />
                            {fieldErrors.email && <span className="error-message">{fieldErrors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                placeholder="912345678"
                                value={formData.telefono}
                                onChange={handleChange}
                                className={fieldErrors.telefono ? 'input-error' : ''}
                            />
                            {fieldErrors.telefono && <span className="error-message">{fieldErrors.telefono}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="clave">Contraseña</label>
                            <input
                                type="password"
                                id="clave"
                                name="clave"
                                placeholder="Mínimo 6 caracteres"
                                value={formData.clave}
                                onChange={handleChange}
                                className={fieldErrors.clave ? 'input-error' : ''}
                            />
                            {fieldErrors.clave && <span className="error-message">{fieldErrors.clave}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmarClave">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmarClave"
                                name="confirmarClave"
                                placeholder="Repite tu contraseña"
                                value={formData.confirmarClave}
                                onChange={handleChange}
                                className={fieldErrors.confirmarClave ? 'input-error' : ''}
                            />
                            {fieldErrors.confirmarClave && <span className="error-message">{fieldErrors.confirmarClave}</span>}
                        </div>

                        <AtomButton type="submit" className="btn-registro">
                            Crear Cuenta
                        </AtomButton>

                        {/* Mensajes de error generales */}
                        {isSubmitted && errorMessages.length > 0 && (
                            <div className="errores-globales">
                                <h4>Por favor corrige los siguientes errores:</h4>
                                {errorMessages.map((msg, i) => (
                                    <p key={i}>• {msg}</p>
                                ))}
                            </div>
                        )}

                        <div className="registro-links">
                            <p>
                                ¿Ya tienes cuenta? <Link to="/inicio_sesion" className="link-login">Iniciar Sesión</Link>
                            </p>
                        </div>
                    </form>
                </section>
            </section>
        </div>
    );
}