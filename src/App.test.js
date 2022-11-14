import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders without crashing', async () => {
  render(<App />);
  await screen.findByTestId('app');
  expect(screen.getByTestId('app')).toBeInTheDocument();
});
