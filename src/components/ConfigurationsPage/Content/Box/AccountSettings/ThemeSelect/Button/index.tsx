import {
  forwardRef,
  MenuButton,
  MenuButtonProps,
  useColorModeValue,
  Button as ChakraButton,
  Icon,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { Content } from './Content';

export const Button = forwardRef<MenuButtonProps, 'button'>((props, ref) => {
  return (
    <MenuButton
      maxW='8em'
      w='100%'
      h='2em'
      fontSize='unset'
      px='.6em'
      bgColor={useColorModeValue(undefined, 'blackAlpha.300')}
      _hover={{
        bgColor: useColorModeValue(undefined, 'blackAlpha.400'),
      }}
      _active={{
        bgColor: useColorModeValue('gray.100', 'blackAlpha.500'),
      }}
      as={ChakraButton}
      ref={ref}
      rightIcon={<Icon as={BiChevronDown} />}
      {...props}
    >
      <Content />
    </MenuButton>
  );
});

Button.displayName = 'Button';
