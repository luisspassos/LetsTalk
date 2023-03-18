import {
  InputLeftElement,
  Icon as ChakraIcon,
  InputElementProps,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

type IconProps = InputElementProps;

export type Icon = typeof Base;

export function Base(props: IconProps) {
  return (
    <InputLeftElement
      h='100%'
      pointerEvents='none'
      fontSize='1.2em'
      w='unset'
      {...props}
    >
      <ChakraIcon as={FiSearch} />
    </InputLeftElement>
  );
}
