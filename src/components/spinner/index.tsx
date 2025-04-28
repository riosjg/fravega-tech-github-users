import styled, { css } from 'styled-components';

const SpinnerUI = styled.span`
  ${({ theme }) => css`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;

    &::before,
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 5px solid ${theme.colors.light};
      animation: prixClipFix 2s linear infinite;
    }

    &::after {
      border-color: ${theme.colors.primary};
      animation:
        prixClipFix 2s linear infinite,
        rotate 0.5s linear infinite reverse;
      inset: 6px;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes prixClipFix {
      0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
      }
      25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
      }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
      }
      75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
      }
      100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
      }
    }
  `}
`;

const SpinnerOverlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.light};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `}
`;

export default function Spinner() {
  return (
    <SpinnerOverlay>
      <SpinnerUI />
    </SpinnerOverlay>
  );
}
