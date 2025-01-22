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

    a {
      text-decoration: none;
    }

    button {
      border: none;
    }

    font-family: 'Lato', sans-serif;
    font-style: normal;
  }

  :root {
    --primary: #CDCDCD;
    --black: #212121;
    --gray: #666;
    --background: rgb(248,248,248);
    --white: #FCFCFC;
    --green: rgb(0, 210, 50); 
    --red: rgb(255, 32, 32);
  }
`;