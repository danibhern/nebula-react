import AtomLink from "../atoms/AtomLink";
import AtomButton from '../atoms/AtomButton';
export default function InicioSesion () {
      const handleSubmit = e => {
    e.preventDefault();
    // Lógica para autenticar
  };
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
                      <label htmlFor="email">Contraseña</label>
                      <input type="password" name="email" id="email" placeholder="Contraseña" />
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