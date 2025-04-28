import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      dark: string;
      light: string;
    };
    spacing: (n?: number) => string;
    radius: string;
  }
}
