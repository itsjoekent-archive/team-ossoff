import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 24px;
`;

const Cover = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: center center;
  margin-bottom: 12px;
`;

const DownloadsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0 !important;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

const DownloadLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 12px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 0;
  }
`;

const DownloadLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 12px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: 12px;
    margin-bottom: 0;
  }
`;

const AltDownload = styled.a`
  display: block;
  width: 100%;
  margin-bottom: 12px;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(33.33% - 12px);
    margin-bottom: 16px;
  }

  img {
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center center;
  }
`;

const AltContainer = styled(Container)`
  ${DownloadLabel} {
    width: 100%;
    text-align: center;
    margin-bottom: 12px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default function GraphicsGallery(props) {
  const {
    coverSrc = '',
    coverAlt = '',
    downloads = [],
  } = props;

  if (!coverSrc) {
    return (
      <AltContainer>
        <DownloadLabel>Click any image to download</DownloadLabel>
        {downloads.map(([src, title]) => (
          <AltDownload key={src} href={src} target="_blank" aria-label={`Open ${title} in new tab`}>
            <img src={src} alt={title} />
          </AltDownload>
        ))}
        {new Array(3 - (downloads.length % 3)).fill(0).map((v, index) => <AltDownload key={index} aria-hidden />)}
      </AltContainer>
    );
  }

  return (
    <Container>
      <Cover src={coverSrc} alt={coverAlt} />
      <DownloadsList>
        <DownloadLabel>Downloads:</DownloadLabel>
        {downloads.map(([src, title]) => (
          <DownloadLink key={src} href={src} target="_blank">{title}</DownloadLink>
        ))}
      </DownloadsList>
    </Container>
  );
}
