import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#5a2db2',
    accent: '#AC3E98',
    dark: '#2B2A29',
    light: '#F5F6FA',
  },
  spacing: (n = 1) => `${0.25 * n}rem`,
  radius: '4px',
};
