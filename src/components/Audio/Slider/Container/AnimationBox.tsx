import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import { useAudioPositionInPercentage } from 'contexts/Audio/AudioPositionInPercentage';
import { useAudioIsPlaying } from 'hooks/Audio/useAudioIsPlaying';
import { ReactNode } from 'react';
import { ContainerProps } from '.';

const slideAnimation = keyframes`
  to { transform: translateX(0); }
`;

type AnimationBoxProps = {
  children?: ReactNode;
  duration: HTMLAudioElement['duration'];
} & BoxProps &
  ContainerProps;

export function AnimationBox({
  children,
  stopAnimation,
  duration,
  ...rest
}: AnimationBoxProps) {
  const { positionInPercentage } = useAudioPositionInPercentage();
  const { isPlaying } = useAudioIsPlaying();

  const animationPlayState: AnimationPlayState =
    isPlaying === true ? 'running' : 'paused';

  const animation = `${slideAnimation} ${duration}s linear ${animationPlayState}`;

  return (
    <Box
      w='100%'
      h='100%'
      animation={stopAnimation === true ? 'none' : animation}
      transform={`translateX(-${positionInPercentage}%)`}
      {...rest}
    >
      {children}
    </Box>
  );
}
