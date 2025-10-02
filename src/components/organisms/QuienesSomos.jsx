
export default function QuienesSomos(){
    return(
    <section className="quienes-somos">
        <h2>Quienes Somos</h2>

        <div className="contenedor">
            <p> 
                En <strong>Cafetería Nebula</strong> creemos que el café es más que una bebida: 
                es un momento de conexión, creatividad y disfrute. 
                Nacimos en 2020 con la misión de llevar café de especialidad a nuestra comunidad, 
                en un espacio moderno y acogedor.
            </p>
        </div>

        <div className="bloques">
            <div className="caja">
                <h3>Misión</h3>
                <p>Ofrecer experiencias únicas a través del café de especialidad, con atención cercana y calidad excepcional.</p>
            </div>
            <div className="caja">
                <h3>Visión</h3>
                <p>Buscamos ser el lugar de encuentro preferido por nuestros clientes, un espacio donde las personas disfruten, se inspiren y compartan momentos especiales.</p>
            </div>
        </div>


        <div className="galeria">
            <h3>Un vistazo a nuestro local</h3>
            <div className="imagenes">
                <img src="https://i.pinimg.com/736x/9f/9a/8f/9f9a8fa4462beac7d57caf8458d354fa.jpg" alt="Interior Nebula"/>
                <img src="https://media.revistaad.es/photos/615d6da7cc6386e4f9909399/master/w_1600%2Cc_limit/JRZ01573.jpg" alt="Café Nebula"/>
                <img src="https://media.timeout.com/images/105932519/750/562/image.jpg" alt="Clientes disfrutando"/>
            </div>
        </div>


        <div className="reseñas">
            <h3>Lo que dicen nuestros clientes</h3>
            <div className="grid-reseñas">
                <div className="reseña">
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <blockquote>“El mejor café que he probado. ¡Volveré siempre!”</blockquote>
                <cite>- Paula R.</cite>
                </div>
                <div className="reseña">
                <p>⭐️⭐️⭐️⭐️</p>
                <blockquote>“Un lugar acogedor y tranquilo, perfecto para estudiar o trabajar.”</blockquote>
                <cite>- Diego M.</cite>
                </div>
                <div className="reseña">
                <p>⭐️⭐️⭐️⭐️⭐️</p>
                <blockquote>“Los postres son increíbles y la atención aún mejor.”</blockquote>
                <cite>- Sofía A.</cite>
                </div>
            </div>
            <button className="dejar-reseña">Deja tu Reseña</button>
        </div> 
    </section>
    );
}