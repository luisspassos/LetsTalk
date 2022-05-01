import { Button as ChakraButton, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type ButtonProps = {
  text: string;
  leftIcon: IconType;
};

export function Button({ text, leftIcon }: ButtonProps) {
  return <ChakraButton leftIcon={<Icon as={leftIcon} />}>{text}</ChakraButton>;
}
