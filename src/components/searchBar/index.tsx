'use client';

import { Search } from 'lucide-react';
import styled, { css } from 'styled-components';

const FormWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
  `}
`;

const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    border: 1px solid ${theme.colors.primary};
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    width: 100%;
    max-width: 600px;
    margin: ${theme.spacing(1)};
  `}
`;

const Input = styled.input`
  ${({ theme }) => css`
    flex: 1;
    padding: ${theme.spacing(3)};
    border: none;
    font-size: 0.95rem;
    color: ${theme.colors.dark};
    background-color: ${theme.colors.light};
    &::placeholder {
      color: ${theme.colors.dark};
    }
    &:focus {
      outline: none;
    }
  `}
`;

const IconBtn = styled.button`
  ${({ theme }) => css`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    border: none;
    cursor: pointer;

    svg {
      color: #fff;
      width: 18px;
      height: 18px;
    }

    &:hover {
      background: ${theme.colors.primary};
    }
  `}
`;

export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}) {
  return (
    <FormWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.();
        }}
      >
        <Input
          placeholder="Search for GitHub users"
          value={value}
          onChange={(e) => onChange(e.target?.value)}
        />
        <IconBtn type="submit">
          <Search aria-label="search" />
        </IconBtn>
      </Form>
    </FormWrapper>
  );
}
