import { Box, BoxProps, keyframes } from '@chakra-ui/react';
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
  isPlaying,
  ...rest
}: AnimationBoxProps) {
  const animationPlayState: AnimationPlayState =
    isPlaying === true ? 'running' : 'paused';

  const animation = `${slideAnimation} ${duration}s linear infinite ${animationPlayState}`;

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
