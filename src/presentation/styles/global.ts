import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body, #root, .app {
    min-height: 100vh;
    width: 100vw;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    transition: all 0.7s;

    a {
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      color: var(--blue-primary);

      &:hover{
        color: var(--blue-dark);
      }
    } 
    
    p {
      margin: 0;
    }

    button {
      border: none;
    }

    font-family: 'Lato', sans-serif;
    font-style: normal;
  }

  /* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--background);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray-light);
}

  :root {
    --blue-primary: #5677d9;
    --blue-dark: #524ff5;
    --blue-light: #d2e8db;
    --primary: #CDCDCD;
    --black: #212121;
    --gray: #666;
    --gray-light: #999;
    --background: rgb(248,248,248);
    --white: #FCFCFC;
    --green: #a5fc8d; 
    --red: #fc847c;
    --yellow: #fff47a;
    --linear-gradient: linear-gradient(36deg, red, pink, blue);
  }
`
