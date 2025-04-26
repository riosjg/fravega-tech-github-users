import styled, { css } from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'accent' }>`
  ${({ theme, variant = 'primary' }) => css`
    background: ${theme.colors[variant]};
    color: #fff;
    padding: ${theme.spacing(2)} ${theme.spacing(4)};
    border: none;
    border-radius: ${theme.radius};
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s opacity;
    &:hover {
      opacity: 0.9;
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;
