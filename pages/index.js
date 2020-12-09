import React from 'react';
import styled from 'styled-components';
import ToolkitCard, { ToolkitCardWrapper } from '../components/ToolkitCard';
import { LedeTitle, LedeSubtitle, LedeContainer } from '../components/HeroBlocks';

const Page = styled.main`
  display: block;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const BackgroundVideo = styled.video`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.navy};
  object-fit: cover;
  object-position: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    object-position: center right;
  }
`;

const BackgroundVideoDarkenOverlay = styled.div`
  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
`;

const BackgroundVideoColorOverlay = styled.div`
  display: block;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right top, ${({ theme }) => theme.colors.red}, ${({ theme }) => theme.colors.blue});
  opacity: 0.5;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;

  position: relative;
  z-index: 4;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
`;

const CardRowTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: 1px;
  padding-left: 24px;
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.largeMobile}) {
    font-size: 12px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 18px;
    margin-left: 105px;
  }
`;

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  position: relative;

  &:before {
    content: '';
    width: 50%;
    max-width: 96px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;

    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  }

  ${ToolkitCardWrapper} {
    padding-right: 24px;
    min-width: 66.66vw;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      min-width: 385px;
    }
  }

  ${ToolkitCardWrapper}:first-child {
    padding-left: 24px;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-left: 105px;
    }
  }
`;

const mobileVideo = {
  'mp4': '/assets/hero-mobile.mp4',
  'webm': '/assets/hero-mobile.webm',
  'poster': '/assets/hero-poster-mobile.jpg',
};

const desktopVideo = {
  'mp4': '/assets/hero.mp4',
  'webm': '/assets/hero.webm',
  'poster': '/assets/hero-poster.jpg',
};

export default function Home() {
  const videoRef = React.useRef();

  const [videoSource, setVideoSource] = React.useState(mobileVideo);

  React.useEffect(() => {
    function updateVideoSource(updatedSource) {
      setVideoSource(updatedSource);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play();
        }
      }, 0);
    }

    function checkScreen() {
      const useMobileSrc = window.matchMedia('screen and (max-width: 500px)').matches;

      if (useMobileSrc && !videoSource.mp4.includes('-mobile')) {
        updateVideoSource(mobileVideo);
      } else if (!useMobileSrc && videoSource.mp4.includes('-mobile')) {
        updateVideoSource(desktopVideo);
      }
    }

    checkScreen();

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [
    videoSource,
    setVideoSource,
  ]);

  return (
    <Page>
      <BackgroundVideo ref={videoRef} muted autoPlay loop poster={videoSource.poster}>
        <source src={videoSource.webm} type="video/webm" />
        <source src={videoSource.mp4} type="video/mp4" />
      </BackgroundVideo>
      <BackgroundVideoDarkenOverlay />
      <BackgroundVideoColorOverlay />
      <ContentContainer>
        <LedeContainer>
          <LedeTitle>We need your help to win the Senate.</LedeTitle>
          <LedeSubtitle>Join our people powered campaign to elect Jon to the Senate.</LedeSubtitle>
        </LedeContainer>
        <CardContainer>
          <CardRowTitle>
            Actions you can take right now to elect jon
          </CardRowTitle>
          <CardRow>
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
            <ToolkitCard title="Guide to Reach and in-state relational organizing" callToAction="Quis blandit turpis cursus in hac habitasse. Venenatis urna cursus eget nunc dui faucibus in ornare." estimatedDuration="15 minutes" requiredDevices="Phone or computer" />
          </CardRow>
        </CardContainer>
      </ContentContainer>
    </Page>
  );
}
