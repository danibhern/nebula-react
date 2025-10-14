import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Catalogo from './Catalogo';
import { BrowserRouter } from 'react-router-dom';

describe("Botones de Categoría en Catálogo", () => {
  beforeEach(() => {
    // Mock localStorage para el carrito
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
  });

  it("muestra ambos botones de categoría correctamente", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const botonCafes = screen.getByText("☕ Ver Cafés Premium");
    const botonInsumos = screen.getByText("🛠️ Ver Insumos de Café");

    expect(botonCafes).toBeInTheDocument();
    expect(botonInsumos).toBeInTheDocument();
  });

  it("al hacer click en 'Ver Cafés Premium', muestra solo productos de café", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const botonCafes = screen.getByText("☕ Ver Cafés Premium");
    fireEvent.click(botonCafes);

    // Verificar que se muestran cafés
    expect(screen.getByText("Café Daroma")).toBeInTheDocument();
    expect(screen.getByText("Manuel Caffe")).toBeInTheDocument();
    expect(screen.getByText("Café Nestle Bonka")).toBeInTheDocument();

    // Verificar que NO se muestran insumos
    expect(screen.queryByText("Kit Basico Barista")).toBeNull();
    expect(screen.queryByText("Prensa Francesa")).toBeNull();
  });

  it("al hacer click en 'Ver Insumos de Café', muestra solo insumos", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const botonInsumos = screen.getByText("🛠️ Ver Insumos de Café");
    fireEvent.click(botonInsumos);

    // Verificar que se muestran insumos
    expect(screen.getByText("Kit Basico Barista")).toBeInTheDocument();
    expect(screen.getByText("Prensa Francesa")).toBeInTheDocument();
    expect(screen.getByText("Jarra de 20 Oz")).toBeInTheDocument();

    // Verificar que NO se muestran cafés
    expect(screen.queryByText("Café Daroma")).toBeNull();
    expect(screen.queryByText("Manuel Caffe")).toBeNull();
  });

  it("muestra ambas categorías cuando no hay filtro activo", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    // Verificar que ambas categorías están visibles inicialmente
    expect(screen.getByText("Café Daroma")).toBeInTheDocument(); // Café
    expect(screen.getByText("Kit Basico Barista")).toBeInTheDocument(); // Insumo
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Catalogo from './Catalogo';
import { BrowserRouter } from 'react-router-dom';

describe("Filtros de precio mínimo y máximo en Catalogo", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
    Storage.prototype.setItem = jest.fn();
  });

  it("filtra productos cuando se ingresa precio mínimo", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputPrecioMin = screen.getByPlaceholderText("Precio mínimo");

    fireEvent.change(inputPrecioMin, { target: { value: "10000" } });

    expect(screen.getByText("Manuel Caffe")).toBeInTheDocument();
    expect(screen.getByText("Café Nestle Bonka")).toBeInTheDocument();
    expect(screen.queryByText("Café Daroma")).toBeNull();
  });

  it("filtra productos cuando se ingresa precio máximo", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputPrecioMax = screen.getByPlaceholderText("Precio máximo");

    fireEvent.change(inputPrecioMax, { target: { value: "10000" } });

    expect(screen.getByText("Café Daroma")).toBeInTheDocument();
    expect(screen.getByText("Manuel Caffe")).toBeInTheDocument();
    expect(screen.queryByText("Kit Basico Barista")).toBeNull();
  });

  it("filtra productos cuando se ingresan ambos precios", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputPrecioMin = screen.getByPlaceholderText("Precio mínimo");
    const inputPrecioMax = screen.getByPlaceholderText("Precio máximo");

    fireEvent.change(inputPrecioMin, { target: { value: "8000" } });
    fireEvent.change(inputPrecioMax, { target: { value: "12000" } });

    expect(screen.getByText("Manuel Caffe")).toBeInTheDocument();
    expect(screen.getByText("Café Nestle Bonka")).toBeInTheDocument();
    expect(screen.queryByText("Café Daroma")).toBeNull();
    expect(screen.queryByText("Kit Basico Barista")).toBeNull();
  });

  it("muestra productos correctos con precio mínimo 15000", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputPrecioMin = screen.getByPlaceholderText("Precio mínimo");

    fireEvent.change(inputPrecioMin, { target: { value: "15000" } });

    expect(screen.getByText("Britt")).toBeInTheDocument();
    expect(screen.getByText("Café Guatemala Antigua")).toBeInTheDocument();
    expect(screen.queryByText("Café Colombia Supremo")).toBeNull();
  });

  it("muestra productos correctos con precio máximo 5000", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputPrecioMax = screen.getByPlaceholderText("Precio máximo");

    fireEvent.change(inputPrecioMax, { target: { value: "5000" } });

    expect(screen.getByText("Taza Cerámica")).toBeInTheDocument();
    expect(screen.queryByText("Café Daroma")).toBeNull();
    expect(screen.queryByText("Cuchara Medidora")).toBeInTheDocument();
  });
});