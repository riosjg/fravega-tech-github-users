'use client';

import { FC } from 'react';
import { useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListOnItemsRenderedProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import UserCard from '@/components/userCard';
import { GitHubUser } from '@/services/github';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

interface VirtualizedListProps {
  users: GitHubUser[];
  isLoadingNextPage: boolean;
  hasNextPage?: boolean;
  loadNextPage: () => void;
}

const ROW_HEIGHT = 100;

const VirtualizedUserList: FC<VirtualizedListProps> = ({
  users,
  isLoadingNextPage,
  hasNextPage = false,
  loadNextPage,
}) => {
  const itemCount = hasNextPage ? users.length + 1 : users.length;
  const isItemLoaded = (index: number) => !hasNextPage || index < users.length;

  const loadMoreItems = useCallback(
    (start: number, stop: number) => {
      if (hasNextPage && !isLoadingNextPage) {
        return loadNextPage();
      }
      return Promise.resolve();
    },
    [hasNextPage, isLoadingNextPage, loadNextPage]
  );

  const onItemsRendered = ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
    if (hasNextPage && visibleStopIndex >= users.length - 1) {
      loadNextPage();
    }
  };

  return (
    <Container>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered: loaderOnItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={ROW_HEIGHT}
                onItemsRendered={(props) => {
                  loaderOnItemsRendered(props);
                  onItemsRendered(props);
                }}
                ref={ref}
              >
                {({ index, style }) => {
                  if (!isItemLoaded(index)) {
                    return (
                      <div style={style}>
                        <p style={{ textAlign: 'center', padding: '1rem' }}>Loading…</p>
                      </div>
                    );
                  }
                  const user = users[index]!;
                  return (
                    <div style={style}>
                      <UserCard user={user} />
                    </div>
                  );
                }}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </Container>
  );
};

export default VirtualizedUserList;
