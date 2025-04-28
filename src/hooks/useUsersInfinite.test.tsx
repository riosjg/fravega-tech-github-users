import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsersInfinite } from './useUsersInfinite';
import * as github from '@/services/github';

jest.spyOn(github, 'searchUsers').mockResolvedValue({
  total_count: 1,
  incomplete_results: false,
  items: [{ login: 'uno', id: 1, avatar_url: '', html_url: '' }],
});
jest
  .spyOn(github, 'listUsers')
  .mockResolvedValue([{ login: 'dos', id: 2, avatar_url: '', html_url: '' }]);

const createWrapper = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

describe('useUsersInfinite', () => {
  it('fetches listUsers on empty term', async () => {
    const { result } = renderHook(() => useUsersInfinite(''), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(1));
    expect(result.current.data?.pages[0]).toEqual([
      { login: 'dos', id: 2, avatar_url: '', html_url: '' },
    ]);
  });

  it('fetches searchUsers on non-empty term', async () => {
    const { result } = renderHook(() => useUsersInfinite('foo'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data?.pages).toHaveLength(1));
    expect(result.current.data?.pages[0]).toEqual([
      { login: 'uno', id: 1, avatar_url: '', html_url: '' },
    ]);
  });
});
