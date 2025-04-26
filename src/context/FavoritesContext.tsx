'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (login: string) => void;
  isFavorite: (login: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('fravega-favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('fravega-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (login: string) => {
    setFavorites((prev) =>
      prev.includes(login) ? prev.filter((l) => l !== login) : [...prev, login]
    );
  };

  const isFavorite = (login: string) => favorites.includes(login);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
}
