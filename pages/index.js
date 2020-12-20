import React from 'react';
import styled, { keyframes } from 'styled-components';
import get from 'lodash.get';
import Head from 'next/head';
import ToolkitCard, { ToolkitCardWrapper } from '../components/ToolkitCard';
import { LedeTitle, LedeSubtitle, LedeContainer } from '../components/HeroBlocks';
import { fetchToolkits } from '../utils/contentfulPosts';

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

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;

  position: relative;
  z-index: 4;

  opacity: 0;
  animation: ${fadeIn} 1.5s 0.5s forwards;
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

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100vh);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;

  ${ToolkitCardWrapper} {
    padding-right: 24px;
    min-width: 66.66vw;

    opacity: 0;
    transform: translateY(100vh);

    &:nth-child(1) {
      animation: ${slideIn} 1.5s 0.5s forwards;
    }

    &:nth-child(2) {
      animation: ${slideIn} 1.5s 0.65s forwards;
    }

    &:nth-child(3) {
      animation: ${slideIn} 1.5s 0.75s forwards;
    }

    &:nth-child(4) {
      animation: ${slideIn} 1.5s 0.85s forwards;
    }

    &:nth-child(5) {
      animation: ${slideIn} 1.5s 0.85s forwards;
    }

    &:nth-child(6) {
      animation: ${slideIn} 1.5s 0.95s forwards;
    }

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

export default function Home(props) {
  const { toolkits } = props;

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

  const toolkitCards = toolkits
    .sort((a, b) => {
      const rankDifference = get(a, 'fields.homepageRank', 0) - get(b, 'fields.homepageRank', 0);

      if (!rankDifference) {
        return new Date(b.sys.updatedAt) - new Date(a.sys.updatedAt);
      }

      return rankDifference;
    })
    .slice(0, 6);

  return (
    <React.Fragment>
      <Head>
        <title>Team Ossoff</title>
      </Head>
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
              {toolkitCards.map((toolkit) => (
                <ToolkitCard
                  key={get(toolkit, 'sys.id')}
                  path={`/toolkit/${get(toolkit, 'fields.slug')}`}
                  title={get(toolkit, 'fields.title')}
                  callToAction={get(toolkit, 'fields.callToAction')}
                  estimatedDuration={get(toolkit, 'fields.estimatedDuration')}
                  requiredDevices={get(toolkit, 'fields.requiredDevices')}
                />
              ))}
            </CardRow>
          </CardContainer>
        </ContentContainer>
      </Page>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const toolkits = await fetchToolkits();

  return {
    props: {
      toolkits,
    },
  }
}
