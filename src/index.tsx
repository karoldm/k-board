import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import './services/firebase';

import { UserContextProvider } from './context/userContext';

import { GlobalStyle } from './styles/global';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <GlobalStyle />
      <App />
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

