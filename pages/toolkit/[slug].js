import React from 'react';
import styled from 'styled-components';
import get from 'lodash.get';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { LedeTitle, LedeSubtitle } from '../../components/HeroBlocks';
import Alarm from '../../components/icons/alarm.svg';
import Devices from '../../components/icons/devices.svg';
import { fetchToolkits, fetchToolkitWithSlug } from '../../utils/contentfulPosts';

const HeroSection = styled.section`
  display: block;
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.navy};

  ${LedeSubtitle} {
    margin-bottom: 24px;
  }
`;

const BackgroundCover = styled.img`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top right;
`;

const BackgroundCoverDarkenOverlay = styled.div`
  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85));
  opacity: 0.5;
`;

const HeroContentContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const PriorityLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 800;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  background: linear-gradient(to right, ${({ theme }) => theme.colors.yellow}, ${({ theme }) => theme.colors.orange});
  padding: 3px 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  width: fit-content;
`;

const HeroDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const HeroDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-child {
    margin-bottom: 6px;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      margin-bottom: 0;
      margin-right: 12px;
    }
  }
`;

const HeroDetailLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 300;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  margin-left: 4px;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 36px 24px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 24px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 12px;
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 24px;

  strong {
    font-weight: 800;
  }
`;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <Header>{children}</Header>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
  },
};

export default function Toolkit(props) {
  const { toolkit } = props;
  console.log(toolkit);
  const priorityLabel = get(toolkit, 'fields.priorityLabel');

  return (
    <React.Fragment>
      <HeroSection>
        <BackgroundCover
          src={get(toolkit, 'fields.coverPhoto.fields.file.url')}
          alt={get(toolkit, 'fields.coverPhoto.fields.description')}
        />
        <BackgroundCoverDarkenOverlay />
        <HeroContentContainer>
          {priorityLabel && <PriorityLabel>{priorityLabel}</PriorityLabel>}
          <LedeTitle>{get(toolkit, 'fields.title')}</LedeTitle>
          <LedeSubtitle>{get(toolkit, 'fields.subtitle')}</LedeSubtitle>
          <HeroDetailsContainer>
            <HeroDetail>
              <Alarm />
              <HeroDetailLabel>{get(toolkit, 'fields.estimatedDuration')}</HeroDetailLabel>
            </HeroDetail>
            <HeroDetail>
              <Devices />
              <HeroDetailLabel>{get(toolkit, 'fields.requiredDevices')}</HeroDetailLabel>
            </HeroDetail>
          </HeroDetailsContainer>
        </HeroContentContainer>
      </HeroSection>
      <ContentColumn>
        {documentToReactComponents(get(toolkit, 'fields.content'), options)}
      </ContentColumn>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const toolkits = await fetchToolkits();

  return {
    paths: toolkits.map((toolkit) => ({
      params: { slug: toolkit.fields.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const toolkit = await fetchToolkitWithSlug(params.slug);

  return { props: { toolkit } };
}
