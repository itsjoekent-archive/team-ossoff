import React from 'react';
import styled from 'styled-components';
import { Header, Paragraph } from './SharedBlocks';

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  max-width: 764px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;

  ${Header} {
    margin-bottom: 12px;
  }

  ${Paragraph} {
    margin-bottom: 36px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;

  @media (min-width: 768px) {
    margin-left: 24px;
  }
`;

const Bubble = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  flex: 0 0 32px;
  width: 32px;
  height: 32px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;

  @media (min-width: 768px) {
    flex: 0 0 64px;
    width: 64px;
    height: 64px;
  }
`;

const StepNumber = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 18px;
  font-weight: 900;
  line-height: 1;
  color: ${({ theme }) => theme.colors.navy};

  position: absolute;
  top: 50%;
  transform: translateY(-44%);

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

export default function StepLayout(props) {
  const { stepNumber, header, subHeader, children } = props;

  return (
    <Container>
      <Bubble>
        <StepNumber>{stepNumber}</StepNumber>
      </Bubble>
      <Content>
        <Header>{header}</Header>
        <Paragraph>{subHeader}</Paragraph>
        {children}
      </Content>
    </Container>
  );
}
