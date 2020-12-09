import React from 'react';
import styled from 'styled-components';
import BackArrow from './icons/back-arrow.svg';
import Facebook from './icons/facebook.svg';
import Twitter from './icons/twitter.svg';
import Instagram from './icons/instagram.svg';
import Snapchat from './icons/snapchat.svg';
import TikTok from './icons/tiktok.svg';

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.navy};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ReturnLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;

  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 24px;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow};

    svg path {
      fill: ${({ theme }) => theme.colors.yellow};
    }
  }

  svg {
    margin-right: 6px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
    width: 33.33%;
  }
`;

const Disclaimer = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  order: 3;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 0;
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
    width: 33.33%;
    justify-content: flex-end;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  cursor: pointer;

  &:hover svg path {
    fill: ${({ theme }) => theme.colors.yellow};
  }
`;

export default function Footer(props) {
  return (
    <Container>
      <ReturnLink href="https://electjon.com/">
        <BackArrow />
        Return to electjon.com
      </ReturnLink>
      <Disclaimer>
        paid for by  jon ossoff for senate
      </Disclaimer>
      <SocialRow>
        <SocialIcon href="https://www.facebook.com/jonossoff/" aria-label="Jon Ossoff Facebook page, opens in new tab" target="_blank">
          <Facebook />
        </SocialIcon>
        <SocialIcon href="https://twitter.com/ossoff" aria-label="Jon Ossoff Twitter page, opens in new tab" target="_blank">
          <Twitter />
        </SocialIcon>
        <SocialIcon href="https://electjon.com/instagram" aria-label="Jon Ossoff Instagram page, opens in new tab" target="_blank">
          <Instagram />
        </SocialIcon>
        <SocialIcon href="https://www.snapchat.com/add/jonossoff" aria-label="Jon Ossoff Snapchat page, opens in new tab" target="_blank">
          <Snapchat />
        </SocialIcon>
        <SocialIcon href="https://www.tiktok.com/@jon" aria-label="Jon Ossoff TikTok page, opens in new tab" target="_blank">
          <TikTok />
        </SocialIcon>
      </SocialRow>
    </Container>
  );
}
