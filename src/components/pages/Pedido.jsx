import React, { useState, useEffect } from 'react';
import AtomLink from '../atoms/AtomLink';
import AtomButton from '../atoms/AtomButton';

const PRODUCTOS_INICIALES = [
  {
    nombre: "Café Daroma",
    descripcion: "Café en grano 250g",
    precio: 5890,
    img: "https://focusmood.coffee/cl/wp-content/uploads/2024/08/Envase-Arabico-Negro-1-600x450.png",
  },
  {
    nombre: "Manuel Caffe",
    descripcion: "Café molido 500g",
    precio: 10000,
    img: "https://manuelcaffe.cl/wp-content/uploads/2025/01/DOIPACK-Armonia_A_62e3ceb6-e998-47a6-b1ca-77804ae85a4e.png",
  },
  {
    nombre: "Café Nestle Bonka",
    descripcion: "Café en grano 250g",
    precio: 10000,
    img: "https://comercialboncafe.com/wp-content/uploads/2025/03/3D-BONKA_ECONOCMY_delizzia.png",
  },
  // Añade aquí más productos según el listado original
];

export default function Pedido() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [carrito, setCarrito] = useState(() => {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const productosFiltrados = PRODUCTOS_INICIALES.filter((producto) => {
    const nombreMatch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const precioMinOk = minPrice === '' || producto.precio >= Number(minPrice);
    const precioMaxOk = maxPrice === '' || producto.precio <= Number(maxPrice);
    return nombreMatch && precioMinOk && precioMaxOk;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

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
            <AtomLink to="/pedidos">Pedidos</AtomLink>
          </div>
        </div>
        <AtomLink to="/inicio_sesion">
          <AtomButton className="boton-login">Iniciar sesión</AtomButton>
        </AtomLink>
        <div id="carrito-icono">
          🛒 <span id="contador">{carrito.length}</span>
          <AtomLink to="/carrito">Ver Carrito</AtomLink>
        </div>
      </nav>

      <div className="barra-busqueda">
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <AtomButton onClick={() => {}}>🔍</AtomButton>
      </div>

      <div className="filtro-precio">
        <input 
          type="number" 
          placeholder="Precio mínimo" 
          value={minPrice} 
          onChange={handleMinPriceChange}
          min="0"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          min="0"
        />
        <AtomButton onClick={() => {}}>Filtrar</AtomButton>
      </div>

      <main id="container">
        <h1>Pedidos de Café</h1>
        {productosFiltrados.length === 0 && <p>No se encontraron productos.</p>}
        <div className="productos-lista">
          {productosFiltrados.map((producto, index) => (
            <div className="producto" key={index} data-nombre={producto.nombre} data-precio={producto.precio}>
              <div className="img">
                <img src={producto.img} alt={producto.nombre} />
              </div>
              <div className="text">
                <h3>{producto.nombre}</h3>
                <h5>{producto.descripcion}</h5>
                <p>${producto.precio.toLocaleString()}</p>
                <AtomButton className="agregar" onClick={() => agregarAlCarrito(producto)}>
                  Añadir al carrito
                </AtomButton>
              </div>
            </div>
          ))}
        </div>
      </main>

      <aside id="lista-carrito">
        <h2>Carrito</h2>
        {carrito.length === 0 ? (
          <p>No hay productos aún.</p>
        ) : (
          <ul>
            {carrito.map((item, i) => (
              <li key={i} className="item-carrito">
                <img src={item.img} alt={item.nombre} className="img-carrito" />
                <span>{item.nombre} - ${item.precio.toLocaleString()}</span>
                <button onClick={() => eliminarDelCarrito(i)} className="btn-eliminar">❌</button>
              </li>
            ))}
          </ul>
        )}
        <p>Total: ${total.toLocaleString()}</p>
        <button id="checkout">Finalizar Compra</button>
      </aside>

      <footer>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul>
            <li><AtomLink to="#" aria-label="Facebook">Facebook</AtomLink></li>
            <li><AtomLink to="#" aria-label="Instagram">Instagram</AtomLink></li>
            <li><AtomLink to="#" aria-label="Twitter">Twitter</AtomLink></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Sucursales</h3>
          <ul>
            <li>Calle Principal 123, Melipilla</li>
            <li>Avenida Central 456, Villarica</li>
            <li>Bulevar 789, Copiapó</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Políticas</h3>
          <ul>
            <li><AtomLink to="#">Políticas de Envío</AtomLink></li>
            <li><AtomLink to="#">Términos y Condiciones</AtomLink></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
