import AtomLink from "../atoms/AtomLink";
import AtomButton from '../atoms/AtomButton';
import { useState } from "react";
export default function InicioSesion () {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser]= useState(null);

    const handleSubmit = e =>{
        e.preventDefault();

        const username=e.target.nombre.value;
        const password=e.target.pass.value;

        if(username === "admin" && password === "admin123"){
            const userData = {
            name: username,
            email: `${username}@nebula.com`,
            role: 'Administrador'
            };

            setUser(userData);
            setLoggedIn(true);

            localStorage.setItem('adminUser',JSON.stringify(userData))
        }
    };

    const handleLogout =() => {
        setUser(null);
        setLoggedIn(false);
        localStorage.removeItem('adminUser');
    };

    if(isLoggedIn){
        return <AdminDashboard user ={user} onLogout={handleLogout}/>;
    }

    return(
    <main>
        <section id="container">
            <img src="/img/nebula.png" alt="Logo Nebula Café" className="logo-ini" />
            <form onSubmit={handleSubmit}>
            <div className="row">
                <label htmlFor="nombre">Usuario</label>
                <input type="text" name="nombre" id="nombre" placeholder="Usuario" />
            </div>
            <div className="row">
                <label htmlFor="pass">Contraseña</label>
                <input type="password" name="pass" id="pass" placeholder="Contraseña" />
            </div>
            <AtomButton type="submit">Iniciar Sesion</AtomButton>
            <div className="links-container">
                <AtomLink to="/registro">Registrarse</AtomLink>
                <AtomLink to="/olvido_contraseña">Olvidé mi contraseña</AtomLink>
            </div>
            </form>
        </section>
        </main>
    );
}