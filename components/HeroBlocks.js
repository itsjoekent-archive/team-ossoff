import styled from 'styled-components';

export const LedeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 472px;
  padding: 24px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 105px;
    margin-bottom: 48px;
  }
`;

export const LedeTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-weight: 900;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 48px;
  }
`;

export const LedeSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
`;
