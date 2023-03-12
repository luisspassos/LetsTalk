import {
  Input as ChakraInput,
  useColorModeValue,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { SearchInputProps } from '.';

type InputProps = {
  setSearch: SearchInputProps['setSearch'];
} & ChakraInputProps;

export function Input({ setSearch, ...rest }: InputProps) {
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <ChakraInput
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderRadius='.8em'
      placeholder='Pesquisar conversa...'
      boxShadow='base'
      fontSize='1em'
      h='unset'
      pl='15%'
      onChange={handleSearch}
      sx={{
        aspectRatio: '1 / 0.17',
      }}
      {...rest}
    />
  );
}
