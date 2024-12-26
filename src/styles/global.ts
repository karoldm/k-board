import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body, #root, .app {
    min-height: 100vh;
    width: 100vw;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    a{
      text-decoration: none;
    }

    button {
      border: none;
    }

    font-family: 'Lato', sans-serif;
    font-style: normal;
  }

  :root {
    --button: #FF5154;
    --primary: #2D4451;
    --black: #232323;
    --white: #FFFFFF; 
  }
`;