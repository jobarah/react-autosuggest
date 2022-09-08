import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Search.IO input', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search.IO/i);
  expect(linkElement).toBeInTheDocument();
});
