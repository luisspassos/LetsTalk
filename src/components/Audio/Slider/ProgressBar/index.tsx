import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import { Thumb } from './Thumb';
import { Track } from './Track';

export type SharedProps = {
  resetAnimation: boolean;
  duration: HTMLAudioElement['duration'];
};

type Props = FlexProps & SharedProps;

export function ProgressBar({ duration, resetAnimation, ...rest }: Props) {
  const sharedProps: SharedProps = {
    duration,
    resetAnimation,
  };

  return (
    <Flex
      flex='1'
      h='33%'
      bg={useColorModeValue('gray.50', 'whiteAlpha.400')}
      overflow='hidden'
      align='center'
      borderRadius='20px'
      {...rest}
    >
      <Track {...sharedProps} />
      <Thumb {...sharedProps} />
    </Flex>
  );
}
