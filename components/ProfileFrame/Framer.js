import React from 'react';
import styled, { css } from 'styled-components';
import StepLayout from './StepLayout';
import { CtaButton, TertiaryButton } from './SharedBlocks';
import frames from './frames';
import { SHARE_STEP, CROP_STEP } from './stepTypes';

const NextButton = styled(CtaButton)`
  margin-bottom: 24px;
`;

const Gallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  margin-bottom: 24px;
`;

const ItemLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 18px;
  font-weight: 900;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.navy};
`;

const ItemContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 0 0 calc(50% - 12px);
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 12px;

  padding: 6px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: none;

  cursor: pointer;

  &:hover {
    ${ItemLabel} {
      color: ${({ theme }) => theme.colors.blue};
    }
  }

  ${({ isHighlighted }) => isHighlighted && css`
    background-color: ${({ theme }) => theme.colors.blue};
    border: 2px solid ${({ theme }) => theme.colors.blue};

    ${ItemLabel} {
      color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      ${ItemLabel} {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  `}

  img {
    display: block;
    width: 100%;
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    flex: 0 0 calc(33.33% - 24px);
    margin-left: 12px;
    margin-right: 12px;
  }
`;

export default function Framer(props) {
  const { setNextStep, frame, setFrame } = props;

  const nextButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (nextButtonRef.current) {
      nextButtonRef.current.scrollIntoView();
    }
  }, [frame]);

  return (
    <StepLayout
      stepNumber="3"
      header="Select your frame"
      subHeader="Click the frame you would like to use below to create your custom profile picture!"
    >
      <Gallery>
        {frames.map(([src, title]) => (
          <ItemContainer
            key={src}
            aria-label={`Select ${title}`}
            isHighlighted={frame === src}
            onClick={() => setFrame(src)}
          >
            <img alt={title} src={src} />
            <ItemLabel>{title}</ItemLabel>
          </ItemContainer>
        ))}
      </Gallery>
      {!!frame && (
        <div>
          <NextButton onClick={() => setNextStep(SHARE_STEP)} ref={nextButtonRef}>
            Next
          </NextButton>
          <TertiaryButton onClick={() => setNextStep(CROP_STEP)}>
            ⟵ Go back
          </TertiaryButton>
        </div>
      )}
    </StepLayout>
  );
}
