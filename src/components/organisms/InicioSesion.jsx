import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AtomButton from '../atoms/AtomButton';
import AtomLink from '../atoms/AtomLink';
// NOTA: Se eliminó la importación directa de 'login' y se reemplazó por la prop onLogin


export default function InicioSesion({ onLogin }) { // Recibe onLogin como prop
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Captura de valores usando los nombres de input que ya tenías
        const username = e.target.nombre.value; 
        const password = e.target.pass.value;

        try {
            // Llama a la función pasada desde la página (LoginPage)
            await onLogin(username, password); 
            // Si es exitoso, la redirección ocurre en el padre.

        } catch (err) {
            // Este error fue lanzado desde LoginPage
            let errorMessage = err.message || 'Error de conexión. Intente más tarde.';
            setError(errorMessage);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <section id="container">
                <img src="/img/nebula.png" alt="Logo Nebula Café" className="logo-ini" />
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="nombre">Correo</label>
                        <input
                            type="email"
                            name="nombre"
                            id="nombre"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" name="pass" id="pass" placeholder="Contraseña" required />
                    </div>
                    
                    {/* Mostrar error */}
                    {error && <div className="error-message text-red-600 bg-red-100 p-2 rounded mt-2">{error}</div>}
                    
                    <AtomButton type="submit" className="button" disabled={isLoading}>
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesion'}
                    </AtomButton>
                    <div className="links-container">
                        <AtomLink to="/registro">Registrarse</AtomLink>
                        <AtomLink to="/olvido_contraseña">Olvidé mi contraseña</AtomLink>
                    </div>
                </form>
            </section>
        </main>
    );
}