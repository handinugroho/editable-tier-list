import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tier maker text', () => {
  render(<App />);
  const linkElement = screen.getByText(/tier maker/i);
  expect(linkElement).toBeInTheDocument();
});
