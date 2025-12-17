import React, { useState } from 'react';
import AtomButton from '../atoms/AtomButton';
import AtomLink from '../atoms/AtomLink';

export default function InicioSesion({ onLogin }) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const username = e.target.nombre.value;
        const password = e.target.pass.value;

        try {
            // Llamamos al login de LoginPage
            await onLogin(username, password);
            // Redirección ocurre en el padre (LoginPage)
        } catch (err) {
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
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            placeholder="Contraseña"
                            required
                        />
                    </div>

                    {error && <div className="error-message text-red-600 bg-red-100 p-2 rounded mt-2">{error}</div>}

                    <AtomButton type="submit" className="button" disabled={isLoading}>
                        {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
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
