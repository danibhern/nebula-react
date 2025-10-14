import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation with Home link', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();
});
