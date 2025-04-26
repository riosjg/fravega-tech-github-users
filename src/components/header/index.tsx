'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';

const HeaderWrapper = styled.header`
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  height: 40px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
`;

const NavRow = styled.nav`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing(2)} 0;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  gap: ${({ theme }) => theme.spacing(6)};
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li<{ $active: boolean }>`
  a {
    color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.dark)};
    font-weight: ${({ $active }) => ($active ? 600 : 500)};
    text-decoration: none;
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    border-radius: ${({ theme }) => theme.radius};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Favorites', href: '/favorites' },
  ];

  return (
    <HeaderWrapper>
      <TopRow>
        <Image src={logo} alt="Logo" width={100} height={20} />
        <div style={{ flex: '0 0 auto', width: '2rem' }} />
      </TopRow>

      <NavRow>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.href} $active={pathname === item.href}>
              <Link href={item.href}>{item.label}</Link>
            </NavItem>
          ))}
        </NavList>
      </NavRow>
    </HeaderWrapper>
  );
}
