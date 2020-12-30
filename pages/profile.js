import React from 'react';
import styled from 'styled-components';
import ProfileFrame from '../components/ProfileFrame';

const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100vw;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.navy};
`;

const Main = styled.main`
  width: 100%;
  max-width: 768px;
  padding: 24px;
  padding-top: 124px;

  position: relative;
  z-index: 4;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 105px;
    padding-top: 196px;
  }
`;

export default function ProfilePage() {
  return (
    <Page>
      <Main>
        <ProfileFrame />
      </Main>
    </Page>
  );
}
