import {
  Input as ChakraInput,
  useColorModeValue,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { useFontSizeBasedOnWidth } from 'hooks/useFontSizeBasedOnWidth';
import { ChangeEvent, useRef } from 'react';
import { SearchInputProps } from '.';

type InputProps = {
  setSearch: SearchInputProps['setSearch'];
} & ChakraInputProps;

export function Input({ setSearch, ...rest }: InputProps) {
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const ref = useRef<HTMLInputElement>(null);

  const { fontSize } = useFontSizeBasedOnWidth(ref.current, 17.5);

  return (
    <ChakraInput
      fontSize={`max(${fontSize}, 0.9375rem)`}
      ref={ref}
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderRadius='.8em'
      placeholder='Pesquisar conversa...'
      boxShadow='base'
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
