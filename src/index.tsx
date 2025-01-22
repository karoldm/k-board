import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import './data/services/firebase';

import { UserContextProvider } from './context/userContext';

import { GlobalStyle } from './presentation/styles/global';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <BrowserRouter>
        <UserContextProvider>
          <GlobalStyle />
          <App />
        </UserContextProvider>
      </BrowserRouter>
  );
}
