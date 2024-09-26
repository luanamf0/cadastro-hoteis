import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: 'Monaco', Tahoma, Geneva, sans-serif;
  }

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }

  input, textarea, select, button {
    font-family: inherit;
  }
`;