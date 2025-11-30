-- Idempotent seed for categorias and productos based on src/components/pages/Catalogo.jsx
-- Run in the correct schema, e.g. mysql -u user -p nebuladb < db/seed_catalogo.sql

START TRANSACTION;

-- Ensure categories exist
INSERT INTO categorias (nombre)
SELECT 'Cafes' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nombre = 'Cafes');

INSERT INTO categorias (nombre)
SELECT 'Insumos' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nombre = 'Insumos');

-- Insert Cafés (categoria 'Cafes')
INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Daroma', 'Café en grano 250g', 5890, LEFT('https://focusmood.coffee/cl/wp-content/uploads/2024/08/Envase-Arabico-Negro-1-600x450.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Daroma' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Manuel Caffe', 'Café molido 500g', 10000, LEFT('https://manuelcaffe.cl/wp-content/uploads/2025/01/DOIPACK-Armonia_A_62e3ceb6-e998-47a6-b1ca-77804ae85a4e.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Manuel Caffe' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Nestle Bonka', 'Café en grano 250g', 10000, LEFT('https://comercialboncafe.com/wp-content/uploads/2025/03/3D-BONKA_ECONOCMY_delizzia.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Nestle Bonka' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Britt', 'Café y chocolate 170g', 15000, LEFT('http://cafebritt.com/cdn/shop/files/costa-rican-chocolate-milk-chocolate-covered-coffee-beans-12oz-front-view.webp?v=1700684501',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Britt' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Colombia Supremo', 'Café molido 250g', 7500, LEFT('https://copantrade.com/cdn/shop/products/COLOMBIASUPREMOCT25LB2022.png?v=1661204758',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Colombia Supremo' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Italiano', 'Café en grano 500g', 12000, LEFT('https://www.boncafeme.ae/cdn/shop/files/BC_CafeItaliano_818x900_3918ed7f-e3be-4318-96f5-5cd6c9d5a345.png?v=1743064470&width=1024',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Italiano' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Lavazza', '250g Molido', 11000, LEFT('https://multicoffee.es/wp-content/uploads/moido_lavazza_espresso.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Lavazza' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Starbucks Pike Place', '500g Grano', 13000, LEFT('https://www.starbucksathome.com/br/media/catalog/product/cache/9c1eb70e7429d8d789faa4b8fa4e43c6/p/i/pike-place-1772x1772.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Starbucks Pike Place' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Illy Classico', '250g Molido', 12500, LEFT('https://www.illy.com/dw/image/v2/BBDD_PRD/on/demandware.static/-/Sites-masterCatalog_illycaffe/default/dwdbad6504/products/sfra/coffee/Medium2x/I0003885_Medium_2x_01.png?q=75',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Illy Classico' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT "Café Peet's Coffee", '250g Molido', 11500, LEFT('https://www.peets.com/cdn/shop/products/CDO-M_1.png?v=1748531168',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = "Café Peet's Coffee" AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Kona', '500g Grano', 18000, LEFT('https://cdn11.bigcommerce.com/s-9wlsnri4bn/images/stencil/1280x1280/products/153/1295/Kona100_FIN2_privateWB__06403.1736997662.png?c=1',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Kona' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Blue Mountain', '250g Molido', 22000, LEFT('https://www.jacoffee.com/cdn/shop/products/JBMBlend454g_grande.png?v=1675693396',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Blue Mountain' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Etiopía Sidamo', '250g Molido', 17000, LEFT('https://cafescamali.com/wp-content/uploads/2016/02/Etiopia-Sidamo-Molido-250g.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Etiopía Sidamo' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Guatemala Antigua', '500g Grano', 16000, LEFT('https://www.cafegeisha.es/cdn/shop/products/CafeGuatemalaAntiguaengrano1_460x@2x.png?v=1642007458',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Guatemala Antigua' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Sumatra', '250g Molido', 15000, LEFT('https://storage.googleapis.com/incapto-production-web-storage/wp-content/uploads/2020/03/1200x1200x_sumatra.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Sumatra' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Brasil Santos', '500g Grano', 14000, LEFT('https://upcafe.pl/wp-content/uploads/2020/08/brasil_santos_kopia.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Brasil Santos' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Yemen Mocha', '250g Molido', 19000, LEFT('https://static.wixstatic.com/media/296099_36a5771a1bde4bfaa10b8bbe7bae8fbe~mv2.png/v1/fill/w_520,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/296099_36a5771a1bde4bfaa10b8bbe7bae8fbe~mv2.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Yemen Mocha' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Kenya AA', '500g Grano', 21000, LEFT('https://www.coffeebean.com/cdn/shop/files/E-Comm_CoffeeBagVisuals_16oz_131124-13.png?v=1732133578',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Kenya AA' AND c.nombre = 'Cafes'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Café Panamá Geisha', '250g Molido', 25000, LEFT('https://www.carasso.ch/wp-content/uploads/2025/03/2-1.png',255), 100, (SELECT id FROM categorias WHERE nombre='Cafes')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Café Panamá Geisha' AND c.nombre = 'Cafes'
);

-- Insert Insumos (categoria 'Insumos')

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Kit Basico Barista', '', 25000, LEFT('https://berlingo.com.mx/wp-content/uploads/2024/12/KIT-BARISTA-3-600x600.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Kit Basico Barista' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Prensa Francesa', '', 18000, LEFT('https://www.outletdelcafe.cl/cdn/shop/files/Prensa-francesa-termometro_1.webp?v=1734096139&width=1080',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Prensa Francesa' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Jarra de 20 Oz', '', 10000, LEFT('https://berlingo.com.mx/wp-content/uploads/2024/12/KIT-BARISTA-5-600x600.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Jarra de 20 Oz' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Best whip', '', 11000, LEFT('https://carsnack.cl/cdn/shop/files/BEST_WHIP_SIFON_BARISTA_PRO_1-2L.png?v=1722454363',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Best whip' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Molino Manual', '', 35000, LEFT('https://www.wearefour.cl/cdn/shop/files/3791_-_Racing_Green.png?v=1720547762&width=416',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Molino Manual' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Taza Cerámica', '', 5000, LEFT('https://sensorial.cl/wp-content/uploads/2021/09/taza-grande.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Taza Cerámica' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Tamper Café', '', 8000, LEFT('https://www.laguildeculinaire.com/cdn/shop/files/BEA302_pdp_1300px.png?v=1736441615',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Tamper Café' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Jarra Vaporizadora', '', 26000, LEFT('https://odisaequipa.com.mx/wp-content/uploads/2020/11/MOD.-WP-20.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Jarra Vaporizadora' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Báscula de Precisión', '', 21000, LEFT('https://www.baxtran.com/imagecache/uploads_images_producto_precision_imatges-noves-abril-2021_720x720_c_bar-perspectiva.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Báscula de Precisión' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Cepillo Limpiador', '', 7000, LEFT('https://www.cafecaribe.cl/cdn/shop/files/9189b3de-d153-4b76-911b-8500dad994c1_2000x.png?v=1754505028',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Cepillo Limpiador' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Molinillo Eléctrico', '', 45000, LEFT('https://www.copacabana.com.uy/images/thumbs/0002111_molinillo-de-cafe-electrico_600.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Molinillo Eléctrico' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Espumador de Leche', '', 20000, LEFT('https://hispaniolacafeshop-eu.s30.cdn-upgates.com/_cache/0/9/097a5fd7352da220c3f9837a9ea89735-milk-frother-fantasia-blu.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Espumador de Leche' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Porta Filtros', '', 9000, LEFT('https://reelec.es/91069-large_default/portafiltro-de-cafetera-saeco-996530029833.jpg',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Porta Filtros' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Tazas de Café x2', '', 15000, LEFT('https://www.nespresso.com/ecom/medias/sys_master/public/31864827412510/ENRICH-600X6337PX-GRAN-LUNGO.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Tazas de Café x2' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Cuchara Medidora', '', 4000, LEFT('https://gw.alicdn.com/i4/828859155/O1CN01PkX4td2HV2lCO7Zwe_!!828859155.png_540x540.jpg',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Cuchara Medidora' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Contenedor Café', '', 8500, LEFT('https://png.pngtree.com/png-clipart/20241024/original/pngtree-clear-glass-jar-with-lid-png-image_16480006.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Contenedor Café' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Espumador Digital', '', 12000, LEFT('https://www.nespresso.com/ecom/medias/sys_master/public/27836031762462/AEROCCINOS-600X337PX-4.png',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Espumador Digital' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Bowl de Mezcla', '', 6000, LEFT('https://www.aliton.com.mx/cdn/shop/files/61224321PDM001G-Photoroom_800x800.png?v=1713042535',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Bowl de Mezcla' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Kit Limpieza Cafetera', '', 14000, LEFT('https://media.miele.com/images/2000020/200002006/20000200632.png?impolicy=boxed&imwidth=1536',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Kit Limpieza Cafetera' AND c.nombre = 'Insumos'
);

INSERT INTO productos (nombre, descripcion, precio, imagen_url, stock, categoria_id)
SELECT 'Pinzas Servir', '', 7500, LEFT('https://inoxibar.com/2225-home_default/pinza-barbacoa.jpg',255), 100, (SELECT id FROM categorias WHERE nombre='Insumos')
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM productos p JOIN categorias c ON p.categoria_id = c.id
  WHERE p.nombre = 'Pinzas Servir' AND c.nombre = 'Insumos'
);

COMMIT;
