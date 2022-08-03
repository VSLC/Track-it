import { createGlobalStyle } from "styled-components";
import "@fontsource/lexend-deca";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: "Lexend Deca";
}
`;

export default GlobalStyle;
