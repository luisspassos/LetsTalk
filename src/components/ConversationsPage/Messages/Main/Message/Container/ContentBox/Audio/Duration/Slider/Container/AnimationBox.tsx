import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import { useAudioDuration } from 'contexts/AudioDurationContext';
import { ReactNode } from 'react';

const slideAnimation = keyframes`
  to { transform: translateX(0); }
`;

type AnimationBoxProps = {
  children?: ReactNode;
} & BoxProps;

export function AnimationBox({ children, ...rest }: AnimationBoxProps) {
  const { duration } = useAudioDuration();

  const animation = `${slideAnimation} ${duration}s linear`;

  return (
    <Box
      w='100%'
      h='100%'
      animation={animation}
      transform='translateX(-100%)'
      {...rest}
    >
      {children}
    </Box>
  );
}
