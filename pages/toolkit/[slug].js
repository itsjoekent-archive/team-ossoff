import React from 'react';
import styled from 'styled-components';
import get from 'lodash.get';
import Head from 'next/head';
import { darken } from 'polished';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import InlineScript from '../../components/InlineScript';
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
  color: ${({ theme }) => theme.colors.navy};
  background: ${({ theme }) => theme.colors.yellow};
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

const HeroCtaButton = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 800;
  font-size: 16px;
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
  margin-bottom: 24px;

  &:hover {
    box-shadow: none;
    background-color: ${({ theme }) => darken(0.1, theme.colors.red)};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
    margin-right: 24px;
  }
`;

const HeroDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-of-type {
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
  color: ${({ theme }) => theme.colors.navy};
  text-align: center;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.yellow};
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
    background-color: ${({ theme }) => darken(0.1, theme.colors.yellow)};
  }
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.6;
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

const Article = styled.article`
  display: flex;
  flex-direction: row;
  padding: 36px 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 105px;
  }
`;

const TableContents = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: fit-content;
    position: sticky;
    top: 36px;
    margin-right: 48px;
  }
`;

const TableTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 800;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.navy};
  text-transform: uppercase;
  margin-bottom: 24px;
`;

const TableLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  margin-bottom: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;

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

function makeHeaderAnchor(text) {
  return text.trim().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
}

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.HEADING_2]: (node, children) => <Header id={makeHeaderAnchor(get(node, 'content[0].value', ''))}>{children}</Header>,
    [BLOCKS.HEADING_6]: (node, children) => <InlineCtaButton>{children}</InlineCtaButton>,
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (get(node, 'content[0].value').startsWith('<iframe')) {
        return (
          <div
            style={{ marginBottom: '24px' }}
            dangerouslySetInnerHTML={{ __html: get(node, 'content[0].value') }}
          />
        );
      }

      return (
        <Paragraph>{children}</Paragraph>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
      <EmbeddedAsset
        src={get(node, 'data.target.fields.file.url')}
        alt={get(node, 'data.target.fields.description')}
      />
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      const type = get(node, 'data.target.sys.contentType.sys.id');

      switch (type) {
        case 'script': return (
          <InlineScript
            title={get(node, 'data.target.fields.title')}
            content={get(node, 'data.target.fields.content')}
          />
        );

        default: return null;
      }
      return null;
    },
  },
};

export default function Toolkit(props) {
  const { toolkit } = props;

  const priorityLabel = get(toolkit, 'fields.priorityLabel');
  const heroButtonLabel = get(toolkit, 'fields.heroButtonLabel');
  const heroButtonLink = get(toolkit, 'fields.heroButtonLink');
  const estimatedDuration = get(toolkit, 'fields.estimatedDuration');
  const requiredDevices = get(toolkit, 'fields.requiredDevices');

  const pageTitle = `${get(toolkit, 'fields.title')} | Team Ossoff`;

  const shareLink = `https://teamossoff.com/toolkit/${get(toolkit, 'fields.slug')}`;
  const shareText = get(toolkit, 'fields.callToAction') || '';
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${encodeURIComponent(shareText)}`;
  const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText || ''}\n${shareLink}`)}`;

  const headers = get(toolkit, 'fields.content.content', [])
    .filter((node) => node.nodeType === BLOCKS.HEADING_2)
    .map((node) => {
      const text = get(node, 'content[0].value', '');
      return [text, makeHeaderAnchor(text)];
    });

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={get(toolkit, 'fields.callToAction')} />
        <meta property="og:image" content={get(toolkit, 'fields.coverPhoto.fields.file.url')} />
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
            {(!!heroButtonLabel && !!heroButtonLink) && (
              <HeroCtaButton href={heroButtonLink}>
                {heroButtonLabel}
              </HeroCtaButton>
            )}
            {!!estimatedDuration && (
              <HeroDetail>
                <Alarm />
                <HeroDetailLabel>{get(toolkit, 'fields.estimatedDuration')}</HeroDetailLabel>
              </HeroDetail>
            )}
            {!!requiredDevices && (
              <HeroDetail>
                <Devices />
                <HeroDetailLabel>{get(toolkit, 'fields.requiredDevices')}</HeroDetailLabel>
              </HeroDetail>
            )}
          </HeroDetailsContainer>
        </HeroContentContainer>
      </HeroSection>
      <Article>
        <TableContents>
          <TableTitle>Jump to section</TableTitle>
          {headers.map(([text, anchor]) => (
            <TableLink key={anchor} href={`#${anchor}`}>{text}</TableLink>
          ))}
        </TableContents>
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
      </Article>
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
