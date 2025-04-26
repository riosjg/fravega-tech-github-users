import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * { 
    box-sizing: border-box;
    margin: 0; 
  }
  body { 
    font-family: 'Inter', sans-serif; 
    background: ${({ theme }) => theme.colors.light};
  }
  a { 
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none; 
  }
`;
