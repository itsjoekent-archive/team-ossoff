import React from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import StepLayout from './StepLayout';
import { CtaButton, TertiaryButton } from './SharedBlocks';
import { FRAME_STEP, UPLOAD_STEP } from './stepTypes';
import 'react-image-crop/dist/ReactCrop.css';

const NextButton = styled(CtaButton)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

export default function Cropper(props) {
  const {
    setNextStep,
    profilePhoto,
    crop,
    setCrop,
  } = props;

  return (
    <StepLayout
      stepNumber="2"
      header="Adjust your photo crop"
      subHeader="Click or touch on the photo and drag your cursor. You can drag the corners of the crop to continue adjusting."
    >
      <ReactCrop
        src={profilePhoto}
        crop={crop}
        onChange={(newCrop, newCropPercent) => setCrop(newCropPercent)}
      />
      <div>
        <NextButton onClick={() => setNextStep(FRAME_STEP)}>
          Next
        </NextButton>
        <TertiaryButton onClick={() => setNextStep(UPLOAD_STEP)}>
          ⟵ Go back
        </TertiaryButton>
      </div>
    </StepLayout>
  );
}
