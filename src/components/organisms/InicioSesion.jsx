import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AtomButton from '../atoms/AtomButton';
import AtomLink from '../atoms/AtomLink';

export default function InicioSesionForm() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const username = e.target.nombre.value;
        const password = e.target.pass.value;

        if (username === "admin" && password === "admin123") {
            const userData = {
                name: username,
                email: `${username}@nebula.com`,
                role: 'Administrador'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/admin'); // Redirige al AdminDashboard
        } else if (username === "cliente" && password === "cliente123") {
            const userData = {
                name: username,
                email: `${username}@nebula.com`,
                role: 'Cliente'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/perfil'); // Redirige al Perfil del cliente
        
        }else if(username === "emp1" && password === "emp123"){
            const userData = {
                name: username,
                email: `${username}@nebula.com`,
                role: 'Empleado Barista'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/emp1'); 

        } else {
            setError('Credenciales incorrectas. Usa: admin/admin123 o cliente/cliente123 o emp1/emp123');
        }
    };

    return (
        <main>
            <section id="container">
                <img src="/img/nebula.png" alt="Logo Nebula Café" className="logo-ini" />
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="nombre">Usuario</label>
                        <input type="text" name="nombre" id="nombre" placeholder="Usuario" required />
                    </div>
                    <div className="row">
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" name="pass" id="pass" placeholder="Contraseña" required />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <AtomButton type="submit" className="button">Iniciar Sesion</AtomButton>
                    <div className="links-container">
                        <AtomLink to="/registro">Registrarse</AtomLink>
                        <AtomLink to="/olvido_contraseña">Olvidé mi contraseña</AtomLink>
                    </div>
                </form>
            </section>
        </main>
    );
}