import React from 'react';
import styled from 'styled-components';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 2px solid #C0C0C0;
`;

const ButtonWrapper = styled.button`
  width: 100%;
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 400;
  font-size: 16px;
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
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
  },
};

export default function InlineScript(props) {
  const { title, content } = props;

  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Container>
      <ButtonWrapper onClick={() => setIsExpanded(!isExpanded)}>
        <Title>{title}</Title>
      </ButtonWrapper>
      {isExpanded && (
        <Content>
          {documentToReactComponents(content, options)}
        </Content>
      )}
    </Container>
  );
}
