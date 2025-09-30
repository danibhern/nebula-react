import React, { useState, useEffect } from 'react';

const images = [
  "https://solnatural.bio/views/img/recipesphotos/215.jpg",
  "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2018/03/294127-tazas-cafe-recomendables-dia.jpg?tf=3840x",
  "https://tofuu.getjusto.com/orioneat-prod/SLGgKeofnc2L9mY7K-Foto%20mix%20de%20dulce.JPG"
];

export default function Second() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="carrusel">
      <div className="carrusel-imagenes">
        <img
          src={images[currentIndex]}
          alt="Carrusel imagen"
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        />
      </div>
    </section>
  );
}
