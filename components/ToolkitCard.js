import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import baseTheme from '../theme';
import Alarm from './alarm.svg';
import Devices from './devices.svg';

export const ToolkitCardWrapper = styled.a`
  display: block;
  width: 100%;
  max-width: 385px;
  text-decoration: none;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 33.33%;
    min-width: 385px;
  }
`;

const ToolkitCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0px 1px 12px 1px rgba(0, 0, 0, 0.25);
`;

const CardTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.cardForeground};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 22px;
  }
`;

const CardCta = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.cardForeground};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
  }
`;

const CardDetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg path {
    fill: ${({ theme }) => theme.cardForeground};
  }
`;

const CardDetailLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.cardForeground};
  margin-left: 4px;
  margin-right: 12px;
`;

export default function ToolkitCard(props) {
  const {
    title,
    callToAction,
    estimatedDuration,
    requiredDevices,
    path,
  } = props;

  const [cardTheme, setCardTheme] = React.useState({
    ...baseTheme,
    cardForeground: baseTheme.colors.navy,
    cardBackground: baseTheme.colors.white,
  });

  function setDefaultCardTheme() {
    setCardTheme({
      ...baseTheme,
      cardForeground: baseTheme.colors.navy,
      cardBackground: baseTheme.colors.white,
    });
  }

  function setInvertedCardTheme() {
    setCardTheme({
      ...baseTheme,
      cardForeground: baseTheme.colors.white,
      cardBackground: baseTheme.colors.navy,
    });
  }

  return (
    <ThemeProvider theme={cardTheme}>
      <ToolkitCardWrapper
        href={path}
        onFocus={setInvertedCardTheme}
        onBlur={setDefaultCardTheme}
        onMouseEnter={setInvertedCardTheme}
        onMouseLeave={setDefaultCardTheme}
      >
        <ToolkitCardContainer>
          <CardTitle>{title}</CardTitle>
          <CardCta>{callToAction}</CardCta>
          <CardDetailsRow>
            <Alarm />
            <CardDetailLabel>{estimatedDuration}</CardDetailLabel>
            <Devices />
            <CardDetailLabel>{requiredDevices}</CardDetailLabel>
          </CardDetailsRow>
        </ToolkitCardContainer>
      </ToolkitCardWrapper>
    </ThemeProvider>
  );
}
