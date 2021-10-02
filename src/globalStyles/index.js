import { createGlobalStyle } from "styled-components";
import UsuaziHosomoziWoff from '../fonts/Usuazi-Hosomozi.woff';
import UsuaziHosomoziWoff2 from '../fonts/Usuazi-Hosomozi.woff2'

export const Font = createGlobalStyle `
@font-face {
    font-family: 'Usuazi Hosomozi';
    src: local('Usuazi Hosomozi'), local('UsuaziHosomozi'), 
         url(${UsuaziHosomoziWoff2}) format('woff2'),
         url(${UsuaziHosomoziWoff}) format('woff');
  }
  
  body * {
    font-family: 'Usuazi Hosomozi', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
    font-style: normal;
    font-weight: normal;
  }
`