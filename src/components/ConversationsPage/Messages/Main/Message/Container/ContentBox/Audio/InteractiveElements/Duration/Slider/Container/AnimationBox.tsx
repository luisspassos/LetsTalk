import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import { useAudioIsPlaying } from 'hooks/useAudioIsPlaying';
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
  percentage,
  stopAnimation,
  duration,
  ...rest
}: AnimationBoxProps) {
  const { isPlaying } = useAudioIsPlaying();

  const animationPlayState: AnimationPlayState =
    isPlaying === true ? 'running' : 'paused';

  const animation = `${slideAnimation} ${duration}s linear ${animationPlayState}`;

  return (
    <Box
      w='100%'
      h='100%'
      animation={stopAnimation === true ? 'none' : animation}
      transform={`translateX(-${percentage}%)`}
      {...rest}
    >
      {children}
    </Box>
  );
}
