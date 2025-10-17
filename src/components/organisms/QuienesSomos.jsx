import { Container, Row, Col } from 'react-bootstrap';

export default function QuienesSomos() {
    return (
        <section className="quienes-somos">
            <Container fluid className="px-0">
                <Row className="justify-content-center mx-0">
                    <Col lg={10} className="px-0">
                        {/* Título */}
                        <h2 className="quienes-somos-title">Quienes Somos</h2>

                        {/* Texto principal */}
                        <div className="contenedor">
                            <p> 
                                En <strong>Cafetería Nebula</strong> creemos que el café es más que una bebida: 
                                es un momento de conexión, creatividad y disfrute. 
                                Nacimos en 2020 con la misión de llevar café de especialidad a nuestra comunidad, 
                                en un espacio moderno y acogedor.
                            </p>
                        </div>

                        {/* Misión y Visión */}
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

                        {/* Galería con Bootstrap grid */}
                        <div className="galeria">
                            <h3>Un vistazo a nuestro local</h3>
                            <Row className="imagenes-grid g-3">
                                <Col md={4} className="image-col">
                                    <img 
                                        src="https://i.pinimg.com/736x/9f/9a/8f/9f9a8fa4462beac7d57caf8458d354fa.jpg" 
                                        alt="Interior Nebula"
                                        className="galeria-img"
                                    />
                                </Col>
                                <Col md={4} className="image-col">
                                    <img 
                                        src="https://media.revistaad.es/photos/615d6da7cc6386e4f9909399/master/w_1600%2Cc_limit/JRZ01573.jpg" 
                                        alt="Café Nebula"
                                        className="galeria-img"
                                    />
                                </Col>
                                <Col md={4} className="image-col">
                                    <img 
                                        src="https://media.timeout.com/images/105932519/750/562/image.jpg" 
                                        alt="Clientes disfrutando"
                                        className="galeria-img"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}