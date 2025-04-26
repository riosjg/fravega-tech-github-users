'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { getUser, GitHubUser } from '@/api/github';
import { useQueries } from '@tanstack/react-query';
import UserCard from '@/components/UserCard';
import styled from 'styled-components';

const Empty = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.dark};
`;

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const results = useQueries({
    queries: favorites.map((login) => ({
      queryKey: ['user', login],
      queryFn: () => getUser(login),
      staleTime: 1000 * 60 * 5, // 5m
    })),
  });

  if (results.some((r) => r.isLoading)) {
    return <Empty>Loading favorite</Empty>;
  }

  if (favorites.length === 0) {
    return <Empty>No favorites yet</Empty>;
  }

  const users: GitHubUser[] = results.filter((r) => r.isSuccess).map((r) => r.data!);

  return (
    <main style={{ padding: '1rem' }}>
      {users.map((user) => (
        <UserCard key={user.login} user={user} />
      ))}
    </main>
  );
}
