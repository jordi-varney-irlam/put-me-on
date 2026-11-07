import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

jest.mock('./components/TextPressure', () => () => null);

beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
});

test('renders the home page hero and empty state', async () => {
  render(
    <MemoryRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </MemoryRouter>
  );
  expect(screen.getByText(/something good/i)).toBeInTheDocument();
  expect(await screen.findByText(/no recommendations yet/i)).toBeInTheDocument();
});
