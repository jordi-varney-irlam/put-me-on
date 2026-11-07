import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', isClosable: true } }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
