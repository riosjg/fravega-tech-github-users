// src/components/__tests__/UserCard.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import UserCard from '.';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { theme } from '@/app/styles/theme';

const mockUser = {
  login: 'riosjg',
  id: 59302971,
  avatar_url: 'https://avatars.githubusercontent.com/u/59302971?v=4',
  html_url: 'https://github.com/riosjg',
};

describe('UserCard', () => {
  const renderWithProviders = (favInitial = false) => {
    if (favInitial) {
      localStorage.setItem('fravega-favorites', JSON.stringify([mockUser.login]));
    }
    render(
      <ThemeProvider theme={theme}>
        <FavoritesProvider>
          <UserCard user={mockUser} />
        </FavoritesProvider>
      </ThemeProvider>
    );
  };

  it('renders an outlined heart when not favorited', () => {
    renderWithProviders(false);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toHaveAttribute('fill', theme.colors.light);
  });

  it('fills the heart with accent when clicked', () => {
    renderWithProviders(false);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button.querySelector('svg')).toHaveAttribute('fill', theme.colors.accent);
  });

  it('renders a filled heart when loaded as favored', () => {
    renderWithProviders(true);
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toHaveAttribute('fill', theme.colors.accent);
  });
});
