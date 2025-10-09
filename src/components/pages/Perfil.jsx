import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import First from '../organisms/First';
import Footer from '../organisms/Footer';
import AtomButton from '../atoms/AtomButton';
import '../../styles/Perfil.css';

export default function Perfil() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [seccionActiva, setSeccionActiva] = useState('informacion');
    const [editando, setEditando] = useState(false);

    const [datosUsuario, setDatosUsuario] = useState({
        nombre: 'Paola Martinez',
        email: 'paola@gmail.com',
        telefono: '+56 9 87398612',
        rut: '20.872.982-0'
    });

    const [direcciones, setDirecciones] = useState([
        {
            id: 1,
            nombre: 'Casa',
            direccion: 'Calle Serrano 1105, Melipilla',
            region: 'Metropolitana',
            comuna: 'Melipilla',
            principal: true
        },
        {
            id: 2,
            nombre: 'Trabajo',
            direccion: 'Av. Principal 456, Oficina 302',
            region: 'Metropolitana',
            comuna: 'Santiago',
            principal: false
        }
    ]);

    const [compras, setCompras] = useState([
        {
            id: 1,
            fecha: '2024-01-15',
            productos: [
                { nombre: 'Café Daroma 250g', cantidad: 2, precio: 5890 },
                { nombre: 'Prensa Francesa', cantidad: 1, precio: 18000 }
            ],
            total: 29780,
            estado: 'Entregado',
            seguimiento: 'ENT123456789'
        },
        {
            id: 2,
            fecha: '2024-01-10',
            productos: [
                { nombre: 'Café Colombia Supremo', cantidad: 1, precio: 7500 },
                { nombre: 'Taza Cerámica', cantidad: 2, precio: 5000 }
            ],
            total: 17500,
            estado: 'En camino',
            seguimiento: 'ENT123456788'
        }
    ]);

    const [metodosPago, setMetodosPago] = useState([
        {
            id: 1,
            tipo: 'Tarjeta de Crédito',
            ultimosDigitos: '4242',
            marca: 'Visa',
            principal: true
        },
        {
            id: 2,
            tipo: 'Tarjeta de Débito',
            ultimosDigitos: '8888',
            marca: 'Mastercard',
            principal: false
        }
    ]);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUsuario(JSON.parse(userData));
        } else {
            navigate('/inicio_sesion');
        }
    }, [navigate]);

    const handleCerrarSesion = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleGuardarInformacion = (e) => {
        e.preventDefault();
        setEditando(false);
        alert('Información actualizada correctamente');
    };

    const agregarDireccion = () => {
        const nuevaDireccion = {
            id: direcciones.length + 1,
            nombre: 'Nueva Dirección',
            direccion: '',
            region: '',
            comuna: '',
            principal: false
        };
        setDirecciones([...direcciones, nuevaDireccion]);
    };

    const establecerDireccionPrincipal = (id) => {
        const nuevasDirecciones = direcciones.map(dir => ({
            ...dir,
            principal: dir.id === id
        }));
        setDirecciones(nuevasDirecciones);
    };

    const eliminarDireccion = (id) => {
        if (direcciones.length > 1) {
            setDirecciones(direcciones.filter(dir => dir.id !== id));
        } else {
            alert('Debes tener al menos una dirección');
        }
    };

    const agregarMetodoPago = () => {
        const nuevoMetodo = {
            id: metodosPago.length + 1,
            tipo: 'Tarjeta de Crédito',
            ultimosDigitos: '0000',
            marca: 'Nueva',
            principal: false
        };
        setMetodosPago([...metodosPago, nuevoMetodo]);
    };

    const establecerMetodoPrincipal = (id) => {
        const nuevosMetodos = metodosPago.map(metodo => ({
            ...metodo,
            principal: metodo.id === id
        }));
        setMetodosPago(nuevosMetodos);
    };

    if (!usuario) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <First />
            
            <div className="app-container">
                {/* Sidebar */}
                <div className="perfil-sidebar">
                    <div className="sidebar-header">
                        <h2>MI PERFIL</h2>
                    </div>
                    
                    <div className="perfil-menu">
                        <button 
                            className={`menu-item ${seccionActiva === 'informacion' ? 'activo' : ''}`}
                            onClick={() => setSeccionActiva('informacion')}
                        >
                            <span className="menu-icon">👤</span>
                            <span>Información Personal</span>
                        </button>
                        <button 
                            className={`menu-item ${seccionActiva === 'direcciones' ? 'activo' : ''}`}
                            onClick={() => setSeccionActiva('direcciones')}
                        >
                            <span className="menu-icon">📍</span>
                            <span>Mis Direcciones</span>
                        </button>
                        <button 
                            className={`menu-item ${seccionActiva === 'compras' ? 'activo' : ''}`}
                            onClick={() => setSeccionActiva('compras')}
                        >
                            <span className="menu-icon">🛒</span>
                            <span>Mis Compras</span>
                        </button>
                        <button 
                            className={`menu-item ${seccionActiva === 'pagos' ? 'activo' : ''}`}
                            onClick={() => setSeccionActiva('pagos')}
                        >
                            <span className="menu-icon">💳</span>
                            <span>Métodos de Pago</span>
                        </button>
                    </div>

                    <div className="session-section">
                        <div className="user-info">
                            <div className="user-avatar">
                                {usuario.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <h4>{usuario.name}</h4>
                                <p>{usuario.role}</p>
                            </div>
                        </div>
                        <button 
                            className="logout-btn"
                            onClick={handleCerrarSesion}
                        >
                            <span>🚪</span>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="perfil-main-content">
                    <div className="header">
                        <h1>Mi Perfil</h1>
                        <div className="header-actions">
                            <button className="btn btn-primary">
                                📊 Resumen
                            </button>
                            <button className="btn btn-outline">
                                ⚙️ Configuración
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Overview */}
                    <div className="dashboard-overview">
                        <h2>Resumen General</h2>
                        <div className="overview-cards">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Compras Totales</div>
                                    <div className="card-icon">🛒</div>
                                </div>
                                <div className="card-value">{compras.length}</div>
                                <div className="card-footer">
                                    <span className="positive">+2 este mes</span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Direcciones</div>
                                    <div className="card-icon">📍</div>
                                </div>
                                <div className="card-value">{direcciones.length}</div>
                                <div className="card-footer">
                                    <span>{direcciones.filter(d => d.principal).length} principal</span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Métodos de Pago</div>
                                    <div className="card-icon">💳</div>
                                </div>
                                <div className="card-value">{metodosPago.length}</div>
                                <div className="card-footer">
                                    <span>{metodosPago.filter(m => m.principal).length} principal</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secciones del Dashboard */}
                    <div className="dashboard-sections-container">
                        <h2>Gestión de Mi Cuenta</h2>
                        <div className="dashboard-sections">
                            <div className="section-card">
                                <h3>👤 Información Personal</h3>
                                <p>Gestiona tu información personal, contacto y datos de perfil.</p>
                                <AtomButton 
                                    onClick={() => setSeccionActiva('informacion')}
                                    className="btn-primary"
                                >
                                    Gestionar Información
                                </AtomButton>
                            </div>
                            <div className="section-card">
                                <h3>📍 Mis Direcciones</h3>
                                <p>Administra tus direcciones de envío y establece tu dirección principal.</p>
                                <AtomButton 
                                    onClick={() => setSeccionActiva('direcciones')}
                                    className="btn-primary"
                                >
                                    Ver Direcciones
                                </AtomButton>
                            </div>
                            <div className="section-card">
                                <h3>🛒 Historial de Compras</h3>
                                <p>Revisa tu historial de pedidos, estados de envío y seguimiento.</p>
                                <AtomButton 
                                    onClick={() => setSeccionActiva('compras')}
                                    className="btn-primary"
                                >
                                    Ver Compras
                                </AtomButton>
                            </div>
                            <div className="section-card">
                                <h3>💳 Métodos de Pago</h3>
                                <p>Administra tus tarjetas y métodos de pago guardados.</p>
                                <AtomButton 
                                    onClick={() => setSeccionActiva('pagos')}
                                    className="btn-primary"
                                >
                                    Gestionar Pagos
                                </AtomButton>
                            </div>
                        </div>
                    </div>

                    {/* Contenido de las secciones */}
                    <div className="section-content">
                        {/* Información Personal */}
                        {seccionActiva === 'informacion' && (
                            <div className="seccion-contenido">
                                <h2>Información Personal</h2>
                                {!editando ? (
                                    <div className="info-display">
                                        <div className="info-item">
                                            <label>Nombre:</label>
                                            <span>{datosUsuario.nombre}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Email:</label>
                                            <span>{datosUsuario.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Teléfono:</label>
                                            <span>{datosUsuario.telefono}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>RUT:</label>
                                            <span>{datosUsuario.rut}</span>
                                        </div>
                                        <AtomButton 
                                            onClick={() => setEditando(true)}
                                            className="btn-primary"
                                        >
                                            ✏️ Editar Información
                                        </AtomButton>
                                    </div>
                                ) : (
                                    <form onSubmit={handleGuardarInformacion} className="info-form">
                                        <div className="form-group">
                                            <label>Nombre:</label>
                                            <input 
                                                type="text" 
                                                value={datosUsuario.nombre}
                                                onChange={(e) => setDatosUsuario({...datosUsuario, nombre: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input 
                                                type="email" 
                                                value={datosUsuario.email}
                                                onChange={(e) => setDatosUsuario({...datosUsuario, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Teléfono:</label>
                                            <input 
                                                type="tel" 
                                                value={datosUsuario.telefono}
                                                onChange={(e) => setDatosUsuario({...datosUsuario, telefono: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>RUT:</label>
                                            <input 
                                                type="text" 
                                                value={datosUsuario.rut}
                                                onChange={(e) => setDatosUsuario({...datosUsuario, rut: e.target.value})}
                                            />
                                        </div>
                                        <div className="form-actions">
                                            <AtomButton type="submit" className="btn-primary">
                                                💾 Guardar Cambios
                                            </AtomButton>
                                            <AtomButton 
                                                type="button" 
                                                onClick={() => setEditando(false)}
                                                className="btn-outline"
                                            >
                                                ❌ Cancelar
                                            </AtomButton>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {/* Mis Direcciones */}
                        {seccionActiva === 'direcciones' && (
                            <div className="seccion-contenido">
                                <h2>Mis Direcciones</h2>
                                <div className="direcciones-grid">
                                    {direcciones.map(direccion => (
                                        <div key={direccion.id} className={`direccion-card ${direccion.principal ? 'principal' : ''}`}>
                                            <div className="direccion-header">
                                                <h3>{direccion.nombre}</h3>
                                                {direccion.principal && <span className="badge-principal">Principal</span>}
                                            </div>
                                            <p>{direccion.direccion}</p>
                                            <p>{direccion.comuna}, {direccion.region}</p>
                                            <div className="direccion-actions">
                                                {!direccion.principal && (
                                                    <button 
                                                        onClick={() => establecerDireccionPrincipal(direccion.id)}
                                                        className="btn-secundario"
                                                    >
                                                        Establecer como Principal
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => eliminarDireccion(direccion.id)}
                                                    className="btn-eliminar"
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AtomButton 
                                    onClick={agregarDireccion}
                                    className="btn-primary"
                                >
                                    ➕ Agregar Nueva Dirección
                                </AtomButton>
                            </div>
                        )}

                        {/* Mis Compras */}
                        {seccionActiva === 'compras' && (
                            <div className="seccion-contenido">
                                <h2>Historial de Compras</h2>
                                <div className="compras-list">
                                    {compras.map(compra => (
                                        <div key={compra.id} className="compra-card">
                                            <div className="compra-header">
                                                <div>
                                                    <strong>Pedido #{compra.id}</strong>
                                                    <span className={`estado ${compra.estado.toLowerCase().replace(' ', '-')}`}>
                                                        {compra.estado}
                                                    </span>
                                                </div>
                                                <span className="fecha">{compra.fecha}</span>
                                            </div>
                                            <div className="compra-productos">
                                                {compra.productos.map((producto, index) => (
                                                    <div key={index} className="producto-item">
                                                        <span>{producto.nombre} x {producto.cantidad}</span>
                                                        <span>${producto.precio.toLocaleString('es-CL')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="compra-footer">
                                                <div className="seguimiento">
                                                    <strong>Seguimiento:</strong> {compra.seguimiento}
                                                </div>
                                                <div className="total">
                                                    <strong>Total: ${compra.total.toLocaleString('es-CL')}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Métodos de Pago */}
                        {seccionActiva === 'pagos' && (
                            <div className="seccion-contenido">
                                <h2>Métodos de Pago Guardados</h2>
                                <div className="metodos-pago-grid">
                                    {metodosPago.map(metodo => (
                                        <div key={metodo.id} className={`metodo-pago-card ${metodo.principal ? 'principal' : ''}`}>
                                            <div className="metodo-header">
                                                <h3>{metodo.tipo}</h3>
                                                {metodo.principal && <span className="badge-principal">Principal</span>}
                                            </div>
                                            <p>{metodo.marca} •••• {metodo.ultimosDigitos}</p>
                                            <div className="metodo-actions">
                                                {!metodo.principal && (
                                                    <button 
                                                        onClick={() => establecerMetodoPrincipal(metodo.id)}
                                                        className="btn-secundario"
                                                    >
                                                        Establecer como Principal
                                                    </button>
                                                )}
                                                <button className="btn-eliminar">
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <AtomButton 
                                    onClick={agregarMetodoPago}
                                    className="btn-primary"
                                >
                                    ➕ Agregar Método de Pago
                                </AtomButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}