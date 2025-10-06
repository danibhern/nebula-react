import React, { useState, useEffect } from 'react';
import AtomLink from '../atoms/AtomLink';
import AtomButton from '../atoms/AtomButton';
import "../../styles/Catalogo.css";

const productos = [
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
  {
    nombre: "Britt",
    descripcion: "Café y chocolate 170g",
    precio: 15000,
    img: "http://cafebritt.com/cdn/shop/files/costa-rican-chocolate-milk-chocolate-covered-coffee-beans-12oz-front-view.webp?v=1700684501",
  },
  {
    nombre: "Café Colombia Supremo",
    descripcion: "Café molido 250g",
    precio: 7500,
    img: "https://copantrade.com/cdn/shop/products/COLOMBIASUPREMOCT25LB2022.png?v=1661204758",
  },
  {
    nombre: "Café Italiano",
    descripcion: "Café en grano 500g",
    precio: 12000,
    img: "https://www.boncafeme.ae/cdn/shop/files/BC_CafeItaliano_818x900_3918ed7f-e3be-4318-96f5-5cd6c9d5a345.png?v=1743064470&width=1024",
  },
  {
    nombre: "Café Lavazza",
    descripcion: "250g Molido",
    precio: 11000,
    img: "https://multicoffee.es/wp-content/uploads/moido_lavazza_espresso.png",
  },
  {
    nombre: "Café Starbucks Pike Place",
    descripcion: "500g Grano",
    precio: 13000,
    img: "https://www.starbucksathome.com/br/media/catalog/product/cache/9c1eb70e7429d8d789faa4b8fa4e43c6/p/i/pike-place-1772x1772.png",
  },
  {
    nombre: "Café Illy Classico",
    descripcion: "250g Molido",
    precio: 12500,
    img: "https://www.illy.com/dw/image/v2/BBDD_PRD/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dwdbad6504/products/sfra/coffee/Medium2x/I0003885_Medium_2x_01.png?q=75",
  },
  {
    nombre: "Café Peet's Coffee",
    descripcion: "250g Molido",
    precio: 11500,
    img: "https://www.peets.com/cdn/shop/products/CDO-M_1.png?v=1748531168",
  },
  {
    nombre: "Café Kona",
    descripcion: "500g Grano",
    precio: 18000,
    img: "https://cdn11.bigcommerce.com/s-9wlsnri4bn/images/stencil/1280x1280/products/153/1295/Kona100_FIN2_privateWB__06403.1736997662.png?c=1",
  },
  {
    nombre: "Café Blue Mountain",
    descripcion: "250g Molido",
    precio: 22000,
    img: "https://www.jacoffee.com/cdn/shop/products/JBMBlend454g_grande.png?v=1675693396",
  },
  {
    nombre: "Café Etiopía Sidamo",
    descripcion: "250g Molido",
    precio: 17000,
    img: "https://cafescamali.com/wp-content/uploads/2016/02/Etiopia-Sidamo-Molido-250g.png",
  },
  {
    nombre: "Café Guatemala Antigua",
    descripcion: "500g Grano",
    precio: 16000,
    img: "https://www.cafegeisha.es/cdn/shop/products/CafeGuatemalaAntiguaengrano1_460x@2x.png?v=1642007458",
  },
  {
    nombre: "Café Sumatra",
    descripcion: "250g Molido",
    precio: 15000,
    img: "https://storage.googleapis.com/incapto-production-web-storage/wp-content/uploads/2020/03/1200x1200x_sumatra.png",
  },
  {
    nombre: "Café Brasil Santos",
    descripcion: "500g Grano",
    precio: 14000,
    img: "https://upcafe.pl/wp-content/uploads/2020/08/brasil_santos_kopia.png",
  },
  {
    nombre: "Café Yemen Mocha",
    descripcion: "250g Molido",
    precio: 19000,
    img: "https://static.wixstatic.com/media/296099_36a5771a1bde4bfaa10b8bbe7bae8fbe~mv2.png/v1/fill/w_520,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/296099_36a5771a1bde4bfaa10b8bbe7bae8fbe~mv2.png",
  },
  {
    nombre: "Café Kenya AA",
    descripcion: "500g Grano",
    precio: 21000,
    img: "https://www.coffeebean.com/cdn/shop/files/E-Comm_CoffeeBagVisuals_16oz_131124-13.png?v=1732133578",
  },
  {
    nombre: "Café Panamá Geisha",
    descripcion: "250g Molido",
    precio: 25000,
    img: "https://www.carasso.ch/wp-content/uploads/2025/03/2-1.png",
  },
];

const insumos = [
  {
    nombre: "Kit Basico Barista",
    precio: 25000,
    img: "https://berlingo.com.mx/wp-content/uploads/2024/12/KIT-BARISTA-3-600x600.png",
  },
  {
    nombre: "Prensa Francesa",
    precio: 18000,
    img: "https://www.outletdelcafe.cl/cdn/shop/files/Prensa-francesa-termometro_1.webp?v=1734096139&width=1080",
  },
  {
    nombre: "Jarra de 20 Oz",
    precio: 10000,
    img: "https://berlingo.com.mx/wp-content/uploads/2024/12/KIT-BARISTA-5-600x600.png",
  },
  {
    nombre: "Best whip",
    precio: 11000,
    img: "https://carsnack.cl/cdn/shop/files/BEST_WHIP_SIFON_BARISTA_PRO_1-2L.png?v=1722454363",
  },
  {
    nombre: "Molino Manual",
    precio: 35000,
    img: "https://www.wearefour.cl/cdn/shop/files/3791_-_Racing_Green.png?v=1720547762&width=416",
  },
  {
    nombre: "Taza Cerámica",
    precio: 5000,
    img: "https://sensorial.cl/wp-content/uploads/2021/09/taza-grande.png",
  },
  {
    nombre: "Tamper Café",
    precio: 8000,
    img: "https://www.laguildeculinaire.com/cdn/shop/files/BEA302_pdp_1300px.png?v=1736441615",
  },
  {
    nombre: "Jarra Vaporizadora",
    precio: 26000,
    img: "https://odisaequipa.com.mx/wp-content/uploads/2020/11/MOD.-WP-20.png",
  },
  {
    nombre: "Báscula de Precisión",
    precio: 21000,
    img: "https://www.baxtran.com/imagecache/uploads_images_producto_precision_imatges-noves-abril-2021_720x720_c_bar-perspectiva.png",
  },
  {
    nombre: "Cepillo Limpiador",
    precio: 7000,
    img: "https://www.cafecaribe.cl/cdn/shop/files/9189b3de-d153-4b76-911b-8500dad994c1_2000x.png?v=1754505028",
  },
  {
    nombre: "Molinillo Eléctrico",
    precio: 45000,
    img: "https://www.copacabana.com.uy/images/thumbs/0002111_molinillo-de-cafe-electrico_600.png",
  },
  {
    nombre: "Espumador de Leche",
    precio: 20000,
    img: "https://hispaniolacafeshop-eu.s30.cdn-upgates.com/_cache/0/9/097a5fd7352da220c3f9837a9ea89735-milk-frother-fantasia-blu.png",
  },
  {
    nombre: "Porta Filtros",
    precio: 9000,
    img: "https://reelec.es/91069-large_default/portafiltro-de-cafetera-saeco-996530029833.jpg",
  },
  {
    nombre: "Tazas de Café x2",
    precio: 15000,
    img: "https://www.nespresso.com/ecom/medias/sys_master/public/31864827412510/ENRICH-600X6337PX-GRAN-LUNGO.png",
  },
  {
    nombre: "Cuchara Medidora",
    precio: 4000,
    img: "https://gw.alicdn.com/i4/828859155/O1CN01PkX4td2HV2lCO7Zwe_!!828859155.png_540x540.jpg",
  },
  {
    nombre: "Contenedor Café",
    precio: 8500,
    img: "https://png.pngtree.com/png-clipart/20241024/original/pngtree-clear-glass-jar-with-lid-png-image_16480006.png",
  },
  {
    nombre: "Espumador Digital",
    precio: 12000,
    img: "https://www.nespresso.com/ecom/medias/sys_master/public/27836031762462/AEROCCINOS-600X337PX-4.png",
  },
  {
    nombre: "Bowl de Mezcla",
    precio: 6000,
    img: "https://www.aliton.com.mx/cdn/shop/files/61224321PDM001G-Photoroom_800x800.png?v=1713042535",
  },
  {
    nombre: "Kit Limpieza Cafetera",
    precio: 14000,
    img: "https://media.miele.com/images/2000020/200002006/20000200632.png?impolicy=boxed&imwidth=1536",
  },
  {
    nombre: "Pinzas Servir",
    precio: 7500,
    img: "https://inoxibar.com/2225-home_default/pinza-barbacoa.jpg",
  },
];

function ProductosList({ productos, onAddToCart }) {
  return (
    <>
      {productos.map((producto, index) => (
        <div className="producto" key={index} data-nombre={producto.nombre} data-precio={producto.precio}>
          <div className="img">
            <img src={producto.img} alt={producto.nombre} />
          </div>
          <div className="text">
            <h3>{producto.nombre}</h3>
            <h5>{producto.descripcion}</h5>
            <p>${producto.precio.toLocaleString()}</p>
            <button className="agregar" onClick={() => onAddToCart(producto)}>Añadir al carrito</button>
          </div>
        </div>
      ))}
    </>
  );
}

function InsumosList({ insumos, onAddToCart }) {
  return (
    <>
      {insumos.map((insumo, index) => (
        <div className="insumo" key={index} data-nombre={insumo.nombre} data-precio={insumo.precio}>
          <div className="im">
            <img src={insumo.img} alt={insumo.nombre} />
          </div>
          <div className="text">
            <h3>{insumo.nombre}</h3>
            <p>${insumo.precio.toLocaleString()}</p>
            <button className="agregar" onClick={() => onAddToCart(insumo)}>Añadir al carrito</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Pedido() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [carrito, setCarrito] = React.useState(() => {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  });

  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
    setMensajeConfirmacion(`Producto "${producto.nombre}" añadido al carrito`);

    setTimeout(() => {
      setMensajeConfirmacion('');
    }, 2000);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const productosFiltrados = productos.filter(producto => {
    const nombreMatch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const minOk = minPrice === '' || producto.precio >= Number(minPrice);
    const maxOk = maxPrice === '' || producto.precio <= Number(maxPrice);
    return nombreMatch && minOk && maxOk;
  });

  const insumosFiltrados = insumos.filter(insumo => {
    const nombreMatch = insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const minOk = minPrice === '' || insumo.precio >= Number(minPrice);
    const maxOk = maxPrice === '' || insumo.precio <= Number(maxPrice);
    return nombreMatch && minOk && maxOk;
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
        <div id="carrito-icono" style={{ position: 'relative' }}>
          🛒 <span id="contador">{carrito.length}</span>
          <AtomLink to="/carrito">Ver Carrito</AtomLink>

          {mensajeConfirmacion && (
            <div style={{
              position: 'absolute',
              top: '2.5rem',
              left: 0,
              backgroundColor: '#b8539050',
              padding: '8px 12px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              zIndex: 20,
              pointerEvents: 'none'
            }}>
              {mensajeConfirmacion}
            </div>
          )}
        </div>
      </nav>

      <div className="barra-busqueda">
        <input type="text" placeholder="Buscar..." value={searchTerm} onChange={handleSearchChange} />
        <AtomButton onClick={() => { }}>🔍</AtomButton>
      </div>

      <div className="filtro-precio">
        <input type="number" placeholder="Precio mínimo" value={minPrice} onChange={handleMinPriceChange} min="0" />
        <input type="number" placeholder="Precio máximo" value={maxPrice} onChange={handleMaxPriceChange} min="0" />
        <AtomButton onClick={() => { }}>Filtrar</AtomButton>
      </div>

      <section id="container">
        <h1>Pedidos de Café</h1>
        {productosFiltrados.length === 0 ? <p>No se encontraron productos.</p> :
          <ProductosList productos={productosFiltrados} onAddToCart={agregarAlCarrito} />
        }
      </section>

      <section id="container2">
        <h1>Insumos de Café</h1>
        {insumosFiltrados.length === 0 ? <p>No se encontraron insumos.</p> :
          <InsumosList insumos={insumosFiltrados} onAddToCart={agregarAlCarrito} />
        }
      </section>

      <aside id="lista-carrito">
        <h2>Carrito</h2>
        {carrito.length === 0 ? <p>No hay productos aún.</p> : (
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
