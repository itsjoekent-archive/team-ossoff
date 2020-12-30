import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Landing from './Landing';
import Upload from './Upload';
import Cropper from './Cropper';
import Framer from './Framer';
import Share from './Share';
import Switch from './Switch';
import {
  LANDING_STEP,
  UPLOAD_STEP,
  CROP_STEP,
  FRAME_STEP,
  SHARE_STEP,
} from './stepTypes';

const fadeOut = keyframes`
  0% { opacity: 1 } 100% { opacity: 0 }
`;

const fadeIn = keyframes`
  0% { opacity: 0 } 100% { opacity: 1 }
`;

const Contents = styled.div`
  width: 100%;
  min-height: 100%;

  animation: ${({ nextStep }) => !!nextStep ? fadeOut : fadeIn} 1s forwards;
`;

export default function ProfileFrame(props) {
  const [step, setStep] = React.useState(LANDING_STEP);
  const [nextStep, setNextStep] = React.useState(null);

  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [crop, setCrop] = React.useState({ unit: 'px', aspect: 1 / 1 });
  const [frame, setFrame] = React.useState(null);

  React.useEffect(() => {
    if (!nextStep) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setStep(nextStep);
      setNextStep(null);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [
    step,
    setStep,
    nextStep,
    setNextStep,
  ]);

  return (
    <Contents nextStep={nextStep}>
      <Switch conditional={({ targetStep }) => step === targetStep}>
        <Landing targetStep={LANDING_STEP} setNextStep={setNextStep} />
        <Upload
          targetStep={UPLOAD_STEP}
          setNextStep={setNextStep}
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
        />
        <Cropper
          targetStep={CROP_STEP}
          setNextStep={setNextStep}
          profilePhoto={profilePhoto}
          crop={crop}
          setCrop={setCrop}
        />
        <Framer
          targetStep={FRAME_STEP}
          setNextStep={setNextStep}
          frame={frame}
          setFrame={setFrame}
        />
        <Share
          targetStep={SHARE_STEP}
          setNextStep={setNextStep}
          profilePhoto={profilePhoto}
          crop={crop}
          frame={frame}
        />
      </Switch>
    </Contents>
  );
}
