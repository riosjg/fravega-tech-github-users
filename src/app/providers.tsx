'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/app/styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { FavoritesProvider } from '@/context/FavoritesContext';
import StyledComponentsRegistry from '@/lib/registry';

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <FavoritesProvider>{children}</FavoritesProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
