'use client';

import styled, { css, useTheme } from 'styled-components';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { GitHubUser } from '@/services/github';

export default function UserCard({ user }: { user: GitHubUser }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const theme = useTheme();
  const fav = isFavorite(user.login);

  return (
    <CardWrapper>
      <Avatar src={user.avatar_url} alt={user.login} />
      <Username href={user.html_url} target="_blank" rel="noreferrer">
        {user.login}
      </Username>
      <FavButton onClick={() => toggleFavorite(user.login)}>
        <Heart color={theme.colors.primary} fill={fav ? theme.colors.accent : theme.colors.light} />
      </FavButton>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    padding: ${theme.spacing(4)};
    border: 1px solid ${theme.colors.primary}14;
    border-radius: ${theme.radius};
    background: #fff;
    box-shadow: 0 1px 4px ${theme.colors.dark}12;
    margin-bottom: ${theme.spacing(4)};
  `}
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: ${(props) => props.theme.spacing(4)};
`;

const Username = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  flex: 1;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FavButton = styled.button`
  ${({ theme }) => css`
    background: none;
    border: none;
    padding: ${theme.spacing(1)};
    cursor: pointer;
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
      color: ${theme.colors.accent};
    }
  `}
`;
