import { useInfiniteQuery } from '@tanstack/react-query';
import { listUsers, searchUsers } from '@/services/github';

export const useUsersInfinite = (term: string) =>
  useInfiniteQuery({
    queryKey: ['users', term],
    queryFn: async ({ pageParam = term ? 1 : 0 }) => {
      if (term) {
        const result = await searchUsers(term, pageParam, 20);
        return result.items;
      } else {
        return await listUsers(pageParam, 20);
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (term) {
        return lastPage.length < 20 ? undefined : allPages.length + 1;
      } else {
        const lastUser = lastPage[lastPage.length - 1];
        return lastUser ? lastUser.id : undefined;
      }
    },
    initialPageParam: term ? 1 : 0,
  });
