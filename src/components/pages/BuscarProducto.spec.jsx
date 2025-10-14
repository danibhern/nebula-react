import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Catalogo from './Catalogo';
import { BrowserRouter } from 'react-router-dom';

describe("Búsqueda de producto en Catalogo", () => {
  it("filtra y muestra productos según el término de búsqueda", () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const inputBusqueda = screen.getByPlaceholderText("Buscar productos...");

    fireEvent.change(inputBusqueda, { target: { value: "Manuel" } });

    expect(screen.getByText("Manuel Caffe")).toBeInTheDocument();
    expect(screen.queryByText("Café Daroma")).toBeNull();
  });
});
