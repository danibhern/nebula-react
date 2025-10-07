import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
import AtomLink from '../atoms/AtomLink';
import AtomButton from '../atoms/AtomButton';
import "../../styles/Catalogo.css";
import "../../styles/Carrito.css";

export default function Carrito() {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState('metropolitana');
    const [direccion, setDireccion] = useState('');
    const [mostrarFormEnvio, setMostrarFormEnvio] = useState(false);

    // Cargar carrito desde localStorage
    useEffect(() => {
        try {
            const storedCarrito = localStorage.getItem('carrito');
            if (storedCarrito) {
                const carritoData = JSON.parse(storedCarrito);
                // Asegurar que cada item tenga cantidad
                const carritoConCantidad = carritoData.map(item => ({
                    ...item,
                    cantidad: item.cantidad || 1
                }));
                setCarrito(carritoConCantidad);
            }
        } catch (error) {
            console.error('Error cargando el carrito:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, loading]);

    // Calcular costo de envío
    const calcularCostoEnvio = () => {
        const subtotal = calcularTotal();
        
        // Envío gratis sobre $15.000
        if (subtotal >= 15000) {
            return 0;
        }
        
        // Calcular costo según región
        switch(region) {
            case 'metropolitana':
                return 2990;
            case 'norte':
            case 'centro':
            case 'sur':
            case 'austral':
                return 4990;
            default:
                return 4990;
        }
    };

    // Obtener nombre de la empresa de envío
    const getEmpresaEnvio = () => {
        if (calcularTotal() >= 15000) {
            return "Envío Gratis";
        }
        return region === 'metropolitana' ? "Paket" : "Bluexpress";
    };

    // Incrementar cantidad de un producto
    const incrementarCantidad = (index) => {
        setCarrito(prev => prev.map((item, i) => 
            i === index ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
        ));
    };

    // Decrementar cantidad de un producto
    const decrementarCantidad = (index) => {
        setCarrito(prev => prev.map((item, i) => 
            i === index && (item.cantidad || 1) > 1 
                ? { ...item, cantidad: (item.cantidad || 1) - 1 } 
                : item
        ));
    };

    // Eliminar producto del carrito
    const eliminarDelCarrito = (index) => {
        setCarrito(prev => prev.filter((_, i) => i !== index));
    };

    // Vaciar todo el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // Calcular subtotal de un producto
    const calcularSubtotal = (item) => {
        return (item.precio * (item.cantidad || 1));
    };

    // Calcular subtotal del carrito (sin envío)
    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
    };

    // Calcular total final (con envío)
    const calcularTotalFinal = () => {
        return calcularTotal() + calcularCostoEnvio();
    };

    // Calcular cantidad total de productos
    const calcularCantidadTotal = () => {
        return carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    };

    // Procesar pago
    const procesarPago = () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        if (!direccion.trim()) {
            alert('Por favor ingresa tu dirección de envío');
            setMostrarFormEnvio(true);
            return;
        }

        // Simular proceso de pago
        const resumenCompra = `
            ¡Compra realizada con éxito!
            
            📦 Resumen del Pedido:
            Productos: $${calcularTotal().toLocaleString('es-CL')}
            Envío: ${calcularCostoEnvio() === 0 ? 'GRATIS' : `$${calcularCostoEnvio().toLocaleString('es-CL')}`}
            Total: $${calcularTotalFinal().toLocaleString('es-CL')}
            
            🚚 Información de Envío:
            Región: ${getNombreRegion()}
            Dirección: ${direccion}
            Empresa: ${getEmpresaEnvio()}
            
            ¡Gracias por tu compra!
        `;

        alert(resumenCompra);
        
        // Vaciar carrito después de la compra
        vaciarCarrito();
        setDireccion('');
        setMostrarFormEnvio(false);
    };

    // Obtener nombre legible de la región
    const getNombreRegion = () => {
        const regiones = {
            'metropolitana': 'Región Metropolitana',
            'norte': 'Norte de Chile',
            'centro': 'Zona Centro',
            'sur': 'Sur de Chile', 
            'austral': 'Zona Austral'
        };
        return regiones[region] || region;
    };

    if (loading) {
        return (
            <div className="cargando">
                <div className="cargando-spinner"></div>
                <p>Cargando carrito...</p>
            </div>
        );
    }

    return (
        <>
            <nav>
                <div className="barra-nav">
                    <div className="logo">
                        <img src="/img/nebula.png" alt="nebula" />
                    </div>
                    <div className="nav-links">
                        <AtomLink to="/">Home</AtomLink>
                        <AtomLink to="/about">Quienes Somos</AtomLink>
                        <AtomLink to="/menu">Menú</AtomLink>
                        <AtomLink to="/pedidos">Catálogo</AtomLink>
                    </div>
                </div>
                <AtomLink to="/inicio_sesion">
                    <AtomButton className="boton-login">Iniciar sesión</AtomButton>
                </AtomLink>
                <div id="carrito-icono">
                    🛒 <span id="contador">{calcularCantidadTotal()}</span>
                    <AtomLink to="/carrito">Ver Carrito</AtomLink>
                </div>
            </nav>

            <div className="carrito-container">
                <div className="carrito-header">
                    <h1 className="carrito-title">Mi Carrito de Compras</h1>
                    <p className="carrito-subtitle">
                        {carrito.length === 0 
                            ? "Tu carrito está vacío" 
                            : `${calcularCantidadTotal()} producto(s) en tu carrito`}
                    </p>
                </div>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <div className="carrito-vacio-icon">🛒</div>
                        <h2>No hay productos en tu carrito</h2>
                        <p>¡Descubre nuestros deliciosos cafés e insumos!</p>
                        <AtomLink to="/pedidos">
                            <AtomButton className="btn-seguir-comprando">
                                Seguir Comprando
                            </AtomButton>
                        </AtomLink>
                    </div>
                ) : (
                    <div className="carrito-contenido">
                        <div className="carrito-productos">
                            {carrito.map((item, index) => (
                                <div className="carrito-item" key={index}>
                                    <div className="carrito-item-imagen">
                                        <img src={item.img} alt={item.nombre} />
                                    </div>
                                    <div className="carrito-item-info">
                                        <h3>{item.nombre}</h3>
                                        {item.descripcion && <p>{item.descripcion}</p>}
                                        <p className="carrito-item-precio">
                                            ${item.precio.toLocaleString('es-CL')} c/u
                                        </p>
                                    </div>
                                    <div className="carrito-item-cantidad">
                                        <button 
                                            onClick={() => decrementarCantidad(index)}
                                            disabled={(item.cantidad || 1) <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.cantidad || 1}</span>
                                        <button onClick={() => incrementarCantidad(index)}>
                                            +
                                        </button>
                                    </div>
                                    <div className="carrito-item-subtotal">
                                        <p>${calcularSubtotal(item).toLocaleString('es-CL')}</p>
                                    </div>
                                    <div className="carrito-item-eliminar">
                                        <button 
                                            onClick={() => eliminarDelCarrito(index)}
                                            className="btn-eliminar"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="carrito-resumen">
                            <div className="resumen-card">
                                <h3>Resumen de Compra</h3>
                                
                                <div className="resumen-linea">
                                    <span>Productos ({calcularCantidadTotal()}):</span>
                                    <span>${calcularTotal().toLocaleString('es-CL')}</span>
                                </div>
                                
                                <div className="resumen-linea envio-info">
                                    <span>
                                        Envío: 
                                        <small>{getEmpresaEnvio()}</small>
                                    </span>
                                    <span className={calcularCostoEnvio() === 0 ? 'envio-gratis' : ''}>
                                        {calcularCostoEnvio() === 0 ? 'GRATIS' : `$${calcularCostoEnvio().toLocaleString('es-CL')}`}
                                    </span>
                                </div>

                                {calcularTotal() < 15000 && (
                                    <div className="envio-alerta">
                                        <p>¡Faltan ${(15000 - calcularTotal()).toLocaleString('es-CL')} para envío GRATIS!</p>
                                    </div>
                                )}
                                
                                <div className="resumen-linea total">
                                    <span>Total:</span>
                                    <span>${calcularTotalFinal().toLocaleString('es-CL')}</span>
                                </div>

                                {/* Formulario de envío */}
                                <div className={`form-envio ${mostrarFormEnvio ? 'mostrar' : ''}`}>
                                    <h4>Información de Envío</h4>
                                    
                                    <div className="form-group">
                                        <label>Región:</label>
                                        <select 
                                            value={region} 
                                            onChange={(e) => setRegion(e.target.value)}
                                        >
                                            <option value="metropolitana">Región Metropolitana</option>
                                            <option value="norte">Norte de Chile</option>
                                            <option value="centro">Zona Centro</option>
                                            <option value="sur">Sur de Chile</option>
                                            <option value="austral">Zona Austral</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Dirección completa:</label>
                                        <input
                                            type="text"
                                            placeholder="Calle, número, departamento, comuna"
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>

                                    <div className="info-envio">
                                        <p><strong>Empresa de envío:</strong> {getEmpresaEnvio()}</p>
                                        <p><strong>Costo de envío:</strong> {
                                            calcularCostoEnvio() === 0 ? 'GRATIS' : `$${calcularCostoEnvio().toLocaleString('es-CL')}`
                                        }</p>
                                    </div>
                                </div>

                                <div className="carrito-acciones">
                                    <AtomButton 
                                        className="btn-vaciar" 
                                        onClick={vaciarCarrito}
                                    >
                                        Vaciar Carrito
                                    </AtomButton>
                                    
                                    {!mostrarFormEnvio ? (
                                        <AtomButton 
                                            className="btn-continuar"
                                            onClick={() => setMostrarFormEnvio(true)}
                                        >
                                            Continuar con el Envío
                                        </AtomButton>
                                    ) : (
                                        <AtomButton 
                                            className="btn-pagar" 
                                            onClick={procesarPago}
                                            disabled={!direccion.trim()}
                                        >
                                            💳 Pagar ${calcularTotalFinal().toLocaleString('es-CL')}
                                        </AtomButton>
                                    )}
                                </div>

                                <AtomLink to="/pedidos">
                                    <AtomButton className="btn-seguir-comprando">
                                        Seguir Comprando
                                    </AtomButton>
                                </AtomLink>
                            </div>
                        </div>
                    </div>
                )}
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