import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
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
        <div className="producto" key={index}>
          <div className="img">
            <img src={producto.img} alt={producto.nombre} />
          </div>
          <div className="text">
            <h3>{producto.nombre}</h3>
            <h5>{producto.descripcion}</h5>
            <p>${producto.precio.toLocaleString('es-CL')}</p>
            <button className="agregar" onClick={() => onAddToCart(producto)}>
              Añadir al carrito
            </button>
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
        <div className="insumo" key={index}>
          <div className="im">
            <img src={insumo.img} alt={insumo.nombre} />
          </div>
          <div className="text">
            <h3>{insumo.nombre}</h3>
            <p>${insumo.precio.toLocaleString('es-CL')}</p>
            <button className="agregar" onClick={() => onAddToCart(insumo)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [carrito, setCarrito] = useState(() => {
    try {
      const stored = localStorage.getItem('carrito');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState(''); // 'cafes', 'insumos', o ''

  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [carrito]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
    setMensajeConfirmacion(`¡${producto.nombre} añadido al carrito!`);

    setTimeout(() => {
      setMensajeConfirmacion('');
    }, 2000);
  };

  const limpiarFiltros = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setCategoriaActiva('');
  };

  const mostrarCafes = () => {
    setCategoriaActiva('cafes');
  };

  const mostrarInsumos = () => {
    setCategoriaActiva('insumos');
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

  const totalProductos = productosFiltrados.length + insumosFiltrados.length;

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
            <AtomLink to="/pedidos">Catalogo</AtomLink>
          </div>
        </div>
        <div id="carrito-icono">
          🛒 <span id="contador">{carrito.length}</span>
          <AtomLink to="/carrito">Ver Carrito</AtomLink>
        </div>
        <AtomLink to="/inicio_sesion">
        <AtomButton className="boton-login">Iniciar sesión</AtomButton>
        </AtomLink>
      </nav>

      {mensajeConfirmacion && (
        <div className="mensaje-confirmacion">
          {mensajeConfirmacion}
        </div>
      )}

      <div className="catalogo-header">
        <h1 className="catalogo-title">Nuestro Catálogo</h1>
        <p className="catalogo-subtitle">Descubre los mejores cafés e insumos para tu experiencia perfecta</p>
      </div>

      <div className="filtros-container">
        <div className="barra-busqueda">
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
          <AtomButton onClick={() => {}}>🔍 Buscar</AtomButton>
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
          <AtomButton onClick={limpiarFiltros}>Limpiar Filtros</AtomButton>
        </div>
      </div>

      {/* BOTONES DE CATEGORÍAS */}
      <div className="categorias-botones">
        <AtomButton 
          className={`btn-categoria ${categoriaActiva === 'cafes' ? 'activo' : ''}`}
          onClick={mostrarCafes}
        >
          ☕ Ver Cafés Premium
        </AtomButton>
        
        <AtomButton 
          className={`btn-categoria ${categoriaActiva === 'insumos' ? 'activo' : ''}`}
          onClick={mostrarInsumos}
        >
          🛠️ Ver Insumos de Café
        </AtomButton>
      </div>

      {/* CONTENIDO DE CATEGORÍAS */}
      <div className="catalogo-contenido">
        {/* CAFÉS PREMIUM */}
        {(categoriaActiva === 'cafes' || categoriaActiva === '') && (
          <div className="categoria-section">
            <h2 className="categoria-title">Cafés Premium</h2>
            {productosFiltrados.length === 0 ? (
              <div className="vacio-mensaje">
                {searchTerm || minPrice || maxPrice 
                  ? "No se encontraron productos con los filtros aplicados." 
                  : "No hay productos para mostrar. Usa los filtros de búsqueda."}
              </div>
            ) : (
              <div className="catalogo-grid">
                <ProductosList productos={productosFiltrados} onAddToCart={agregarAlCarrito} />
              </div>
            )}
          </div>
        )}

        {/* INSUMOS DE CAFÉ */}
        {(categoriaActiva === 'insumos' || categoriaActiva === '') && (
          <div className="categoria-section">
            <h2 className="categoria-title">Insumos de Café</h2>
            {insumosFiltrados.length === 0 ? (
              <div className="vacio-mensaje">
                {searchTerm || minPrice || maxPrice 
                  ? "No se encontraron insumos con los filtros aplicados." 
                  : "No hay insumos para mostrar. Usa los filtros de búsqueda."}
              </div>
            ) : (
              <div className="catalogo-grid">
                <InsumosList insumos={insumosFiltrados} onAddToCart={agregarAlCarrito} />
              </div>
            )}
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