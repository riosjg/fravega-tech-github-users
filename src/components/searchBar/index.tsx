'use client';
import styled, { css } from 'styled-components';

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormWrapper>
      <Form>
        <Input
          placeholder="Search for GitHub users"
          value={value}
          onChange={(e) => onChange(e.target?.value)}
        />
      </Form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    width: 100%;
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
