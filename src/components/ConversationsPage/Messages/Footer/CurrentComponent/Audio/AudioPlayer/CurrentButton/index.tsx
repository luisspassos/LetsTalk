import { CurrentButton as CurrentButtonComponent } from 'components/Audio/Buttons/CurrentButton';
import { ChakraProps } from '@chakra-ui/react';
import { PauseButton } from './Pause';
import { PlayButton } from './Play';

export const styles: ChakraProps = {
  fontSize: '1.8rem',
  flexShrink: 0,
};

export function CurrentButton() {
  return (
    <CurrentButtonComponent PauseButton={PauseButton} PlayButton={PlayButton} />
  );
}
