import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import First from '../organisms/First.jsx';
import Footer from '../organisms/Footer.jsx';
import AtomButton from '../atoms/AtomButton';
import '../../styles/PortalPagos.css';

export default function PortalPagos() {
  const location = useLocation();
  const navigate = useNavigate();
  const [montoTotal, setMontoTotal] = useState(0);
  const [datosEnvio, setDatosEnvio] = useState(null);
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [procesando, setProcesando] = useState(false);
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    nombre: '',
    vencimiento: '',
    cvv: ''
  });

 
  useEffect(() => {
    if (location.state) {
      setMontoTotal(location.state.montoTotal || 0);
      setDatosEnvio(location.state.datosEnvio || null);
    } else {
      navigate('/carrito');
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosTarjeta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const procesarPago = async () => {
    setProcesando(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // API de pagos ( PayPal, etc.)
      console.log('Procesando pago:', {
        monto: montoTotal,
        metodo: metodoPago,
        envio: datosEnvio,
        tarjeta: metodoPago === 'tarjeta' ? datosTarjeta : null
      });

      alert('¡Pago procesado exitosamente!');
      
      localStorage.removeItem('carrito');
      navigate('/confirmacion', { 
        state: { 
          exito: true, 
          monto: montoTotal,
          datosEnvio: datosEnvio
        } 
      });
      
    } catch (error) {
      alert('Error en el pago: ' + error.message);
    } finally {
      setProcesando(false);
    }
  };

  const volverAlCarrito = () => {
    navigate('/carrito');
  };

  return (
    <>
      <First />
      
      <div className="portal-pagos">
        <div className="pagos-container">
          <h1>🛒 Portal de Pagos</h1>
          
          {/* Resumen del pedido */}
          <div className="resumen-pedido">
            <h2>Resumen de tu compra</h2>
            <div className="monto-total">
              <strong>Total a pagar: ${montoTotal.toLocaleString('es-CL')}</strong>
            </div>
            
            {datosEnvio && (
              <div className="datos-envio">
                <h3>📦 Datos de envío</h3>
                <p><strong>Dirección:</strong> {datosEnvio.direccion}</p>
                <p><strong>Región:</strong> {datosEnvio.region}</p>
                <p><strong>Comuna:</strong> {datosEnvio.comuna}</p>
              </div>
            )}
          </div>

          {/* Selección de método de pago */}
          <div className="metodos-pago">
            <h2>💳 Método de Pago</h2>
            
            <div className="opciones-pago">
              <label className={`opcion-pago ${metodoPago === 'tarjeta' ? 'activo' : ''}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  checked={metodoPago === 'tarjeta'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>💳 Tarjeta de Crédito/Débito</span>
              </label>

              <label className={`opcion-pago ${metodoPago === 'transferencia' ? 'activo' : ''}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="transferencia"
                  checked={metodoPago === 'transferencia'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>🏦 Transferencia Bancaria</span>
              </label>

              <label className={`opcion-pago ${metodoPago === 'efectivo' ? 'activo' : ''}`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="efectivo"
                  checked={metodoPago === 'efectivo'}
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <span>💰 Pago en Efectivo</span>
              </label>
            </div>

            {/* Formulario de tarjeta */}
            {metodoPago === 'tarjeta' && (
              <div className="formulario-tarjeta">
                <h3>Datos de la Tarjeta</h3>
                <div className="campos-tarjeta">
                  <input
                    type="text"
                    name="numero"
                    placeholder="Número de tarjeta"
                    value={datosTarjeta.numero}
                    onChange={handleInputChange}
                    maxLength="16"
                  />
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre en la tarjeta"
                    value={datosTarjeta.nombre}
                    onChange={handleInputChange}
                  />
                  <div className="fila-tarjeta">
                    <input
                      type="text"
                      name="vencimiento"
                      placeholder="MM/AA"
                      value={datosTarjeta.vencimiento}
                      onChange={handleInputChange}
                      maxLength="5"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={datosTarjeta.cvv}
                      onChange={handleInputChange}
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Instrucciones para otros métodos */}
            {metodoPago === 'transferencia' && (
              <div className="instrucciones-pago">
                <h3>Instrucciones para Transferencia</h3>
                <p>Banco: Banco Nebula</p>
                <p>Cuenta Corriente: 123456789</p>
                <p>RUT: 12.345.678-9</p>
                <p>Email: pagos@cafenebula.cl</p>
              </div>
            )}

            {metodoPago === 'efectivo' && (
              <div className="instrucciones-pago">
                <h3>Pago en Efectivo</h3>
                <p>Puedes pagar en efectivo al momento de la entrega.</p>
                <p>Ten exacto el monto: <strong>${montoTotal.toLocaleString('es-CL')}</strong></p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="acciones-pago">
            <AtomButton 
              className="btn-secundario"
              onClick={volverAlCarrito}
              disabled={procesando}
            >
              ← Volver al Carrito
            </AtomButton>
            
            <AtomButton 
              className="btn-primario"
              onClick={procesarPago}
              disabled={procesando || (metodoPago === 'tarjeta' && !datosTarjeta.numero)}
            >
              {procesando ? 'Procesando...' : `✅ Pagar $${montoTotal.toLocaleString('es-CL')}`}
            </AtomButton>
          </div>

          {/* Información de seguridad */}
          <div className="info-seguridad">
            <p>🔒 Tu información está protegida con encriptación SSL</p>
          </div>
        </div>
      </div>

      <Footer /> {/* 👈 Footer incluido */}
    </>
  );
}