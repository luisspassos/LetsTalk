import {
  Button as ChakraButton,
  Icon,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: IconType;
} & ChakraButtonProps;

export function Button({ text, icon, onClick, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      justifyContent='start'
      variant='ghost'
      gap={['0px', '12px', '15px']}
      fontSize={['14px', '15px', '16px']}
      leftIcon={<Icon fontSize={['18', '19px', '20px']} as={icon} />}
      fontWeight={400}
      onClick={onClick}
      px={['7px', '13px', '16px']}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}
