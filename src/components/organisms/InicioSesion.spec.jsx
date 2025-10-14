import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import InicioSesion from '../organisms/InicioSesion'; 

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const localStorageMock = {
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('InicioSesionForm', () => {
  it('debe iniciar sesión correctamente con credenciales de admin', async () => {
    render(
      <BrowserRouter>
        <InicioSesion />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/usuario/i), {
      target: { value: 'admin' }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'admin123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesion/i }));

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({
          name: 'admin',
          email: 'admin@nebula.com',
          role: 'Administrador'
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/admin');
    });
  });
});