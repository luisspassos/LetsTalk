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
      gap={['0px', '12px', '15px']}
      fontSize={['14px', '15px', '16px']}
      leftIcon={<Icon fontSize={['18', '19px', '20px']} as={leftIcon} />}
      fontWeight={400}
      onClick={onClick}
      px={['7px', '13px', '16px']}
    >
      {text}
    </ChakraButton>
  );
}
