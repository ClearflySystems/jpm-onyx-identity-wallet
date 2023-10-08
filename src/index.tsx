import React from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react'
import EnkiEthereumWalletProvider from "./services/EnkiEthereumWalletProvider";
import './assets/css/theme.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('enki-root') as HTMLElement
);

root.render(
  <EnkiEthereumWalletProvider>
    <ChakraProvider>
      <App/>
    </ChakraProvider>
  </EnkiEthereumWalletProvider>
);

