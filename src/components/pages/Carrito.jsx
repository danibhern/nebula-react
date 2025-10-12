import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate
import AtomLink from '../atoms/AtomLink';
import AtomButton from '../atoms/AtomButton';
import Footer from '../organisms/Footer.jsx';
import "../../styles/Catalogo.css";
import "../../styles/Carrito.css";

export default function Carrito() {
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [region, setRegion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [comuna, setComuna] = useState(''); // 👈 Nueva variable para comuna
    const [mostrarFormEnvio, setMostrarFormEnvio] = useState(false);
    const [cargandoDireccion, setCargandoDireccion] = useState(false);
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);
    const [scriptCargado, setScriptCargado] = useState(false);
    const navigate = useNavigate(); // 👈 Hook para navegación

    useEffect(() => {
        try {
            const storedCarrito = localStorage.getItem('carrito');
            if (storedCarrito) {
                const carritoData = JSON.parse(storedCarrito);
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

    useEffect(() => {
        if (!loading) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, loading]);

    // Inicializar Google Places Autocomplete
    useEffect(() => {
        if (mostrarFormEnvio && !scriptCargado) {
            loadGooglePlacesScript();
        }
        
        if (scriptCargado && mostrarFormEnvio && inputRef.current) {
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => {
                initAutocomplete();
            }, 100);
        }
        
        return () => {
            // Limpiar el autocomplete cuando el componente se desmonte
            if (autocompleteRef.current) {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            }
        };
    }, [mostrarFormEnvio, scriptCargado]);

    const loadGooglePlacesScript = () => {
        if (document.getElementById('google-places-script')) {
            setScriptCargado(true);
            return;
        }

        const script = document.createElement('script');
        script.id = 'google-places-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAq3Wf3dbr2AOv05JQ21lToka1zUrYnN98&libraries=places&callback=initGoogleMaps`;
        script.async = true;
        script.defer = true;
        
        // Función callback global
        window.initGoogleMaps = () => {
            setScriptCargado(true);
        };
        
        script.onerror = () => {
            console.error('Error cargando Google Places API');
        };
        
        document.head.appendChild(script);
    };

    const initAutocomplete = () => {
        if (!inputRef.current || !window.google) {
            console.log('Google Maps no está disponible');
            return;
        }

        try {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                {
                    types: ['address'],
                    componentRestrictions: { country: 'cl' },
                    fields: ['formatted_address', 'address_components', 'geometry']
                }
            );

            autocompleteRef.current.addListener('place_changed', () => {
                setCargandoDireccion(true);
                const place = autocompleteRef.current.getPlace();
                
                if (place && place.formatted_address) {
                    setDireccion(place.formatted_address);
                    const { regionDetectada, comunaDetectada } = detectarRegionYComunaDesdePlace(place);
                    setRegion(regionDetectada);
                    setComuna(comunaDetectada);
                    console.log('Dirección seleccionada:', place.formatted_address);
                    console.log('Región detectada:', regionDetectada);
                    console.log('Comuna detectada:', comunaDetectada);
                } else {
                    console.log('No se pudo obtener la dirección');
                }
                setCargandoDireccion(false);
            });

            console.log('Autocomplete inicializado correctamente');
        } catch (error) {
            console.error('Error inicializando autocomplete:', error);
        }
    };

    // Función para detectar región y comuna desde el objeto de Google Places
    const detectarRegionYComunaDesdePlace = (place) => {
        if (!place || !place.address_components) return { regionDetectada: 'desconocida', comunaDetectada: 'desconocida' };

        const address = place.formatted_address.toLowerCase();
        const addressComponents = place.address_components;

        // Buscar la región en los componentes de la dirección
        const regionComponent = addressComponents.find(component => 
            component.types.includes('administrative_area_level_1')
        );

        // Buscar la comuna
        const comunaComponent = addressComponents.find(component => 
            component.types.includes('locality') || 
            component.types.includes('sublocality_level_1')
        );

        let regionDetectada = 'desconocida';
        let comunaDetectada = comunaComponent ? comunaComponent.long_name : 'desconocida';

        if (regionComponent) {
            const regionName = regionComponent.long_name.toLowerCase();
            
            if (regionName.includes('metropolitana')) {
                regionDetectada = 'metropolitana';
            } else if (regionName.includes('arica') || regionName.includes('tarapacá') || 
                       regionName.includes('antofagasta') || regionName.includes('atacama') || 
                       regionName.includes('coquimbo')) {
                regionDetectada = 'norte';
            } else if (regionName.includes('valparaíso') || regionName.includes('libertador')) {
                regionDetectada = 'centro';
            } else if (regionName.includes('maule') || regionName.includes('ñuble') ||
                       regionName.includes('biobío') || regionName.includes('la araucanía') ||
                       regionName.includes('los ríos') || regionName.includes('los lagos')) {
                regionDetectada = 'sur';
            } else if (regionName.includes('aysén') || regionName.includes('magallanes')) {
                regionDetectada = 'austral';
            }
        }

        // Detección por palabras clave en la dirección completa
        if (address.includes('santiago') || address.includes('providencia') || 
            address.includes('las condes') || address.includes('ñuñoa') ||
            address.includes('macul') || address.includes('la florida') ||
            address.includes('puente alto') || address.includes('maipú') ||
            address.includes('san bernardo') || address.includes('estación central')) {
            regionDetectada = 'metropolitana';
        } else if (address.includes('arica') || address.includes('iquique') || 
                   address.includes('antofagasta') || address.includes('calama') ||
                   address.includes('copiapó') || address.includes('la serena') ||
                   address.includes('coquimbo') || address.includes('ovalle')) {
            regionDetectada = 'norte';
        } else if (address.includes('valparaíso') || address.includes('viña del mar') ||
                   address.includes('quilpué') || address.includes('rancagua') ||
                   address.includes('san fernando') || address.includes('curicó') ||
                   address.includes('talca') || address.includes('línares')) {
            regionDetectada = 'centro';
        } else if (address.includes('concepción') || address.includes('talcahuano') ||
                   address.includes('chillán') || address.includes('los ángeles') ||
                   address.includes('temuco') || address.includes('valdivia') ||
                   address.includes('osorno') || address.includes('puerto montt')) {
            regionDetectada = 'sur';
        } else if (address.includes('coyhaique') || address.includes('puerto aysén') ||
                   address.includes('punta arenas') || address.includes('puerto natales')) {
            regionDetectada = 'austral';
        }
        
        return { regionDetectada, comunaDetectada };
    };

    const calcularCostoEnvio = () => {
        const subtotal = calcularTotal();
        
        if (subtotal >= 15000) {
            return 0;
        }
        
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

    const getEmpresaEnvio = () => {
        if (calcularTotal() >= 15000) {
            return "Envío Gratis";
        }
        return region === 'metropolitana' ? "Paket" : "Bluexpress";
    };

    const incrementarCantidad = (index) => {
        setCarrito(prev => prev.map((item, i) => 
            i === index ? { ...item, cantidad: (item.cantidad || 1) + 1 } : item
        ));
    };

    const decrementarCantidad = (index) => {
        setCarrito(prev => prev.map((item, i) => 
            i === index && (item.cantidad || 1) > 1 
                ? { ...item, cantidad: (item.cantidad || 1) - 1 } 
                : item
        ));
    };

    const eliminarDelCarrito = (index) => {
        setCarrito(prev => prev.filter((_, i) => i !== index));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const calcularSubtotal = (item) => {
        return (item.precio * (item.cantidad || 1));
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + calcularSubtotal(item), 0);
    };

    const calcularTotalFinal = () => {
        return calcularTotal() + calcularCostoEnvio();
    };

    const calcularCantidadTotal = () => {
        return carrito.reduce((total, item) => total + (item.cantidad || 1), 0);
    };

    // 👈 NUEVA FUNCIÓN: Redirigir al portal de pagos
    const redirigirAPortalPagos = () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío');
            return;
        }

        if (!direccion.trim()) {
            alert('Por favor ingresa tu dirección de envío');
            setMostrarFormEnvio(true);
            return;
        }

        if (region === 'desconocida') {
            alert('Por favor selecciona una dirección válida de Chile para calcular el envío');
            return;
        }

        // Navegar al portal de pagos con los datos necesarios
        navigate('/pagos', { 
            state: { 
                montoTotal: calcularTotalFinal(),
                datosEnvio: { 
                    direccion, 
                    region: getNombreRegion(),
                    comuna 
                }
            }
        });
    };

    const getNombreRegion = () => {
        const regiones = {
            'metropolitana': 'Región Metropolitana',
            'norte': 'Norte de Chile',
            'centro': 'Zona Centro',
            'sur': 'Sur de Chile', 
            'austral': 'Zona Austral',
            'desconocida': 'Por verificar'
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
                        <AtomLink to="/catalogo">Catálogo</AtomLink>
                        <AtomLink to="/resenas">Reseñas</AtomLink>
                        <AtomLink to="/contacto">Contacto</AtomLink>

                    </div>
                </div>
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
                        <AtomLink to="/catalogo">
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

                                {/* Formulario de envío con autocompletado */}
                                <div className={`form-envio ${mostrarFormEnvio ? 'mostrar' : ''}`}>
                                    <h4>Información de Envío</h4>
                                    
                                    <div className="form-group">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            placeholder="Comienza a escribir tu dirección..."
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                            disabled={cargandoDireccion}
                                        />
                                        {cargandoDireccion && <div className="cargando-direccion">Detectando región...</div>}
                                    </div>

                                    {direccion && (
                                        <div className="info-envio">
                                            <p><strong>Empresa de envío:</strong> {getEmpresaEnvio()}</p>
                                            <p><strong>Costo de envío:</strong> {
                                                calcularCostoEnvio() === 0 ? 'GRATIS' : `$${calcularCostoEnvio().toLocaleString('es-CL')}`
                                            }</p>
                                            {comuna !== 'desconocida' && (
                                                <p><strong>Comuna:</strong> {comuna}</p>
                                            )}
                                        </div>
                                    )}

                                    {region === 'desconocida' && direccion && (
                                        <div className="alerta-region">
                                            <p>⚠️ No pudimos detectar tu región. Por favor selecciona una dirección válida en Chile.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="carrito-acciones">
                                    <AtomButton 
                                        className="btn-vaciar"
                                        onClick={vaciarCarrito}
                                    >
                                        🗑️ Vaciar Carrito
                                    </AtomButton>
    
                                    {!mostrarFormEnvio ? (
                                        <AtomButton 
                                            className="btn-pagar"
                                            onClick={() => setMostrarFormEnvio(true)}
                                        >
                                            💳 Continuar a Pago
                                        </AtomButton>
                                    ) : (
                                        <AtomButton 
                                            className="btn-pagar" 
                                            onClick={redirigirAPortalPagos} // 👈 Cambiado a la nueva función
                                            disabled={!direccion.trim() || region === 'desconocida'}
                                        >
                                            💳 Ir a Pagar ${calcularTotalFinal().toLocaleString('es-CL')}
                                        </AtomButton>
                                    )}
                                </div>

                                <AtomLink to="/catalogo">
                                    <AtomButton className="btn-seguir-comprando">
                                        Seguir Comprando
                                    </AtomButton>
                                </AtomLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}