import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carrito from './Carrito';
import Catalogo from './Catalogo';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => '[]'); 
  Storage.prototype.setItem = jest.fn();
});

describe('Carrito - añadir y eliminar productos', () => {

  it('añade un producto al carrito desde Catalogo', async () => {
    render(
      <BrowserRouter>
        <Catalogo />
      </BrowserRouter>
    );

    const botonAñadir = screen.getAllByText('Añadir al carrito')[0];
    fireEvent.click(botonAñadir);

    const mensajeConfirmacion = await screen.findByText(/añadido al carrito!/i);
    expect(mensajeConfirmacion).toBeInTheDocument();
  });

  it('elimina un producto del carrito', async () => {
    const mockCarrito = [
      {
        nombre: "Café Daroma",
        descripcion: "Café en grano 250g",
        precio: 5890,
        img: "https://focusmood.coffee/cl/wp-content/uploads/2024/08/Envase-Arabico-Negro-1-600x450.png",
        cantidad: 1,
      },
    ];
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockCarrito));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Café Daroma/i)).toBeInTheDocument();

    const botonesEliminar = screen.getAllByRole('button', { name: /🗑️/i });
    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(screen.queryByText(/Café Daroma/i)).toBeNull();
    });
  });


  it('muestra los productos en el carrito', async () => {
    const mockCarrito = [
      {
        nombre: "Café Daroma",
        descripcion: "Café en grano 250g",
        precio: 5890,
        img: "https://focusmood.coffee/cl/wp-content/uploads/2024/08/Envase-Arabico-Negro-1-600x450.png",
        cantidad: 1,
      },
      {
        nombre: "Manuel Caffe", 
        descripcion: "Café molido 500g",
        precio: 10000,
        img: "https://manuelcaffe.cl/wp-content/uploads/2025/01/DOIPACK-Armonia_A_62e3ceb6-e998-47a6-b1ca-77804ae85a4e.png",
        cantidad: 1,
      }
    ];
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockCarrito));

    render(
      <BrowserRouter>
        <Carrito />
      </BrowserRouter>
    );
    
    expect(await screen.findByText("Café Daroma")).toBeInTheDocument();
    expect(await screen.findByText("Manuel Caffe")).toBeInTheDocument();
  });

});