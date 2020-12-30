import styled from 'styled-components';

export const Header = styled.h1`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

export const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.white};
`;

export const CtaButton = styled.button`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  padding: 12px 24px;

  z-index: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const SecondaryCtaButton = styled.button`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  padding: 6px 12px;

  z-index: 1;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
`;

export const TertiaryButton = styled.button`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  text-decoration: none;
  background: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`;
