import React from 'react';
import styled from 'styled-components';
import StepLayout from './StepLayout';
import frames from './frames';
import { CtaButton, TertiaryButton } from './SharedBlocks';
import { FRAME_STEP } from './stepTypes';

const InnerLayout = styled.div`
  img {
    margin-bottom: 24px;
  }

  ${CtaButton} {
    width: fit-content;
    margin-bottom: 24px;
  }
`;

export default function Share(props) {
  const { frame, profilePhoto, crop, setNextStep } = props;

  const [dataUri, setDataUri] = React.useState(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const [src, title, color] = frames.find(([src]) => src === frame); // eslint-disable-line

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const profileImage = new Image();

    profileImage.onload = () => {
      ctx.drawImage(
        profileImage,
        (crop.x / 100) * profileImage.width,
        (crop.y / 100) * profileImage.height,
        (crop.width / 100) * profileImage.width,
        (crop.height / 100) * profileImage.height,
        0, 0,
        canvas.width, canvas.height,
      );

      const frameImage = new Image();
      frameImage.onload = () => {
        ctx.drawImage(frameImage, 0, 0, frameImage.width, frameImage.height, 0, 0, canvas.width, canvas.height);
        setDataUri(canvas.toDataURL());
      };

      frameImage.src = src;
    };

    profileImage.src = profilePhoto;
  }, [frame, profilePhoto, crop, setDataUri]);

  return (
    <StepLayout
      stepNumber="4"
      header="Download & share!"
      subHeader="Thanks for being a part of #TeamOssoff! Download your custom profile picture, and then upload it to Facebook, Twitter, Instagram, or wherever you hang out online!"
    >
      <InnerLayout>
        <img alt="Your custom profile frame" src={dataUri} width="256" height="256" />
        <canvas ref={canvasRef} width="512" height="512" style={{ display: 'none' }} />
        <CtaButton as="a" href={dataUri} download>Download</CtaButton>
        <TertiaryButton onClick={() => setNextStep(FRAME_STEP)}>⟵ Go back</TertiaryButton>
      </InnerLayout>
    </StepLayout>
  );
}
