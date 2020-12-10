import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

const Container = styled.nav`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
`;

const Logo = styled.img`
  width: 96px;
`;

const CtaButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 800;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.red};
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
  }
`;

export default function Navigation() {
  return (
    <Container>
      <a href="/">
        <Logo src="/assets/logo-white.png" />
      </a>
      <CtaButton href="https://secure.actblue.com/donate/ms_hp_ossoff?refcode=team-ossoff">Donate</CtaButton>
    </Container>
  );
}
