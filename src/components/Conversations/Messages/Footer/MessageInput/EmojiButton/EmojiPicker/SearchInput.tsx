import { Input } from '@chakra-ui/react';

export function SearchInput() {
  return (
    <Input
      placeholder='Pesquisar emoji'
      mt='10px'
      fontSize='15px'
      bgColor='blackAlpha.200'
      h='40px'
      flexShrink={0}
      w='99.5%'
      mx='auto'
    />
  );
}
