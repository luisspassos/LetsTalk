import { Button as ChakraButton, Icon } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  text: string;
  leftIcon: IconType;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export function Button({ text, leftIcon, onClick }: ButtonProps) {
  return (
    <ChakraButton
      justifyContent='start'
      variant='ghost'
      gap='15px'
      leftIcon={<Icon fontSize='20px' as={leftIcon} />}
      fontWeight={400}
      onClick={onClick}
    >
      {text}
    </ChakraButton>
  );
}
