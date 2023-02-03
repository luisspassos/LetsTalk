import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useAudioIsPlaying } from 'hooks/Audio/useAudioIsPlaying';
import { CSSProperties, ReactNode } from 'react';
import { ContainerProps } from '.';

type AnimationStyles = {
  playState: AnimationPlayState;
  fillMode: CSSProperties['animationFillMode'];
};

type AnimationBoxProps = {
  children?: ReactNode;
} & BoxProps &
  ContainerProps;

const slideAnimation = keyframes`
  to { transform: translateX(0); }
`;

export function AnimationBox({
  children,
  resetAnimation,
  duration,
  ...rest
}: AnimationBoxProps) {
  const { positionInPercentage } = useAudioPositionInPercentage();
  const { isPlaying } = useAudioIsPlaying();

  const animationStyles: AnimationStyles = {
    playState: isPlaying ? 'running' : 'paused',
    fillMode: duration === 0 ? 'backwards' : 'forwards',
  };

  const animation = `${slideAnimation} ${duration}s linear ${animationStyles.fillMode} ${animationStyles.playState}`;

  return (
    <Box
      w='100%'
      h='100%'
      animation={resetAnimation === true ? 'none' : animation}
      transform={`translateX(-${positionInPercentage}%)`}
      {...rest}
    >
      {children}
    </Box>
  );
}
