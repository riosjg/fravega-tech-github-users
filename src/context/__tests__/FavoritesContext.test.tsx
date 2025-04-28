import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

function TestComponent() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div>
      <div data-testid="fav-list">{favorites.join(',')}</div>
      <button data-testid="btn-toggle" onClick={() => toggleFavorite('user1')}>
        Toggle user1
      </button>
      <div data-testid="is-fav">{isFavorite('user1') ? 'yes' : 'no'}</div>
    </div>
  );
}

describe('Checks favorite feature', () => {
  const setup = () =>
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

  it('beggins with an empty list', () => {
    setup();
    expect(screen.getByTestId('fav-list')).toHaveTextContent('');
    expect(screen.getByTestId('is-fav')).toHaveTextContent('no');
  });

  it('adds to localStorage', () => {
    setup();
    const btn = screen.getByTestId('btn-toggle');
    fireEvent.click(btn);

    expect(screen.getByTestId('fav-list')).toHaveTextContent('user1');
    expect(screen.getByTestId('is-fav')).toHaveTextContent('yes');

    const stored = JSON.parse(localStorage.getItem('fravega-favorites') || '[]');
    expect(stored).toContain('user1');
  });

  it('deletes correctly if already exists', () => {
    setup();
    const btn = screen.getByTestId('btn-toggle');
    fireEvent.click(btn);
    expect(screen.getByTestId('fav-list')).toHaveTextContent('user1');
    fireEvent.click(btn);
    expect(screen.getByTestId('fav-list')).toHaveTextContent('');
    expect(screen.getByTestId('is-fav')).toHaveTextContent('no');
  });
});
