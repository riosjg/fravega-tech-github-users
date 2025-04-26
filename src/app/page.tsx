'use client';

import { useCallback, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsersInfinite } from '@/hooks/useUsersInfinite';
import debounce from 'lodash.debounce';
import { Button } from '@/components/ui';
import SearchBar from '@/components/searchBar';
import UserCard from '@/components/userCard';
import VirtualizedUserList from '@/components/virtualizedList';
import styled from 'styled-components';

const qc = new QueryClient();

export default function UsersPage() {
  const [input, setInput] = useState('');
  const [term, setTerm] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetching, status, error } = useUsersInfinite(term);
  const users = data?.pages.flatMap((page) => page) ?? [];

  const setTermDebounced = useMemo(() => debounce((v: string) => setTerm(v), 2000), []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value || '');
      setTermDebounced(value || '');
    },
    [setTermDebounced]
  );

  return (
    <QueryClientProvider client={qc}>
      <Main className="p-4">
        <SearchBar value={input} onChange={handleChange} />

        {status === 'pending' && <p>Loading…</p>}
        {status === 'error' && <p className="text-red-500">{String(error)}</p>}

        {status === 'success' && (
          <VirtualizedUserList
            users={users}
            hasNextPage={hasNextPage}
            isLoadingNextPage={isFetching}
            loadNextPage={fetchNextPage}
          />
        )}
      </Main>
    </QueryClientProvider>
  );
}

const Main = styled.main`
  height: calc(100vh - 40px);
`;
