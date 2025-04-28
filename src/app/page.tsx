'use client';

import { useCallback, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsersInfinite } from '@/hooks/useUsersInfinite';
import debounce from 'lodash.debounce';
import SearchBar from '@/components/searchBar';
import VirtualizedUserList from '@/components/virtualizedList';
import styled, { css } from 'styled-components';
import Spinner from '@/components/spinner';
import { GitHubUser } from '@/services/github';
import { ArrowUp, ArrowDown, ArrowDownUp } from 'lucide-react';

const qc = new QueryClient();

function sortByLogin(users: GitHubUser[]): GitHubUser[] {
  return [...users].sort((a, b) =>
    a.login.localeCompare(b.login, undefined, { sensitivity: 'base' })
  );
}

export default function UsersPage() {
  const [input, setInput] = useState('');
  const [term, setTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | undefined>(undefined);
  const { data, fetchNextPage, hasNextPage, isFetching, status, error } = useUsersInfinite(term);
  const users = data?.pages.flatMap((page) => page) ?? [];

  const sortedUsers = useMemo(() => {
    if (!sortDirection) return users;
    const asc = sortByLogin(users);
    return sortDirection === 'asc' ? asc : asc.reverse();
  }, [users, sortDirection]);

  const toggleSort = useCallback(() => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const setTermDebounced = useMemo(() => debounce((v: string) => setTerm(v), 1000), []);

  const handleChange = useCallback(
    (value: string) => {
      setInput(value || '');
      setTermDebounced(value || '');
    },
    [setTermDebounced]
  );

  const contentByStatus: Record<typeof status, React.ReactNode> = {
    pending: <Spinner />,
    error: <p>{String(error)}</p>,
    success: (
      <VirtualizedUserList
        users={sortedUsers}
        hasNextPage={hasNextPage}
        isLoadingNextPage={isFetching}
        loadNextPage={fetchNextPage}
      />
    ),
  };

  return (
    <QueryClientProvider client={qc}>
      <Main>
        <Wrapper>
          <SearchBar value={input} onChange={handleChange} />
          <SortButton onClick={toggleSort}>
            Username
            {sortDirection === 'asc' ? (
              <ArrowUp />
            ) : sortDirection === 'desc' ? (
              <ArrowDown />
            ) : (
              <ArrowDownUp />
            )}
          </SortButton>
        </Wrapper>
        {contentByStatus[status] ?? null}
      </Main>
    </QueryClientProvider>
  );
}

const Main = styled.main`
  height: 100vh;
`;

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const SortButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    cursor: pointer;
    padding: ${theme.spacing(2)} ${theme.spacing(4)};
    gap: ${theme.spacing(2)};
    border: 1px solid #ccc;
    border-radius: ${theme.radius};
    color: ${theme.colors.light};
    height: fit-content;
    svg {
      color: ${theme.colors.light};
      width: 18px;
      height: 18px;
    }

    &:hover {
      background: ${theme.colors.primary};
    }
  `}
`;
