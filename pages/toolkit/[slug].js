import React from 'react';
import styled from 'styled-components';
import get from 'lodash.get';
import Head from 'next/head';
import { darken } from 'polished';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { LedeTitle, LedeSubtitle } from '../../components/HeroBlocks';
import Alarm from '../../components/icons/alarm.svg';
import Devices from '../../components/icons/devices.svg';
import Facebook from '../../components/icons/facebook.svg';
import Twitter from '../../components/icons/twitter.svg';
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

const BylineRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 48px;
  }
`;

const AuthorRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 6px;
`;

const NameColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Name = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled(Name)`
  font-weight: 300;
`;

const SocialColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${Name} {
    margin-bottom: 6px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${Name} {
      margin-bottom: 0;
      text-align: right;
    }
  }
`;

const SocialIconRow = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 0;
    margin-left: 12px;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.navy};
  }

  &:hover svg path {
    fill: ${({ theme }) => theme.colors.red};
  }
`;

const Header = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 24px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 32px;
  }
`;

const InlineCtaButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 800;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.red};
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;

  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
  }
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

const EmbeddedAsset = styled.img`
  display: block;
  width: 100%;
  margin: 24px auto;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  padding: 36px 24px;
  margin-left: auto;
  margin-right: auto;

  ol, ul {
    margin-top: 0;
    margin-bottom: 12px;

    ${Paragraph} {
      margin-bottom: 12px;
    }
  }

  ol > li > ol > li {
    list-style-type: lower-alpha;
  }

  ${Header} + ol, ${Header} + ul {
    margin-top: 24px;
  }
`;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <Header>{children}</Header>,
    [BLOCKS.HEADING_6]: (node, children) => <InlineCtaButton>{children}</InlineCtaButton>,
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
      <EmbeddedAsset
        src={get(node, 'data.target.fields.file.url')}
        alt={get(node, 'data.target.fields.description')}
      />
    ),
  },
};

export default function Toolkit(props) {
  const { toolkit } = props;
  const priorityLabel = get(toolkit, 'fields.priorityLabel');

  const shareLink = `https://teamossoff.com/toolkit/${get(toolkit, 'fields.slug')}`;
  const shareText = get(toolkit, 'fields.callToAction') || '';
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${encodeURIComponent(shareText)}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText || ''}\n${shareLink}`)}`;

  return (
    <React.Fragment>
      <Head>
        <title>{get(toolkit, 'fields.title')} | Team Ossoff</title>
      </Head>
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
        <BylineRow>
          <AuthorRow>
            <Avatar
              src={get(toolkit, 'fields.author.fields.avatar.fields.file.url')}
              alt={get(toolkit, 'fields.author.fields.avatar.fields.description')}
            />
            <NameColumn>
              <Name>{get(toolkit, 'fields.author.fields.name')}</Name>
              <Title>{get(toolkit, 'fields.author.fields.jobTitle')}</Title>
            </NameColumn>
          </AuthorRow>
          <SocialColumn>
            <Name>Share toolkit</Name>
            <SocialIconRow>
              <SocialIcon href={facebookLink} aria-label="Share this toolkit to Facebook">
                <Facebook />
              </SocialIcon>
              <SocialIcon href={twitterLink} aria-label="Share this toolkit to Twitter">
                <Twitter />
              </SocialIcon>
            </SocialIconRow>
          </SocialColumn>
        </BylineRow>
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
