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
      gap='4%'
      py='3%'
      h='unset'
      fontSize='configurations-page-md'
      leftIcon={<Icon fontSize='1.2em' as={icon} />}
      fontWeight={400}
      onClick={onClick}
      px='5%'
      whiteSpace='unset'
      textAlign='left'
      minW={0}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}
