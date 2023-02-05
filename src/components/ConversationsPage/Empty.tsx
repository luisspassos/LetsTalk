import { Flex, Img } from '@chakra-ui/react';
import { SidebarToggleButton } from './Messages/Header/SidebarToggleButton';

export function Empty() {
  return (
    <Flex flex='1' p='20px'>
      <SidebarToggleButton />
      <Img
        mx='auto'
        alignSelf='center'
        maxH={['150px', '200px', '250px']}
        flexShrink={0}
        src='/images/messages.svg'
        alt='Vázio'
        draggable={false}
      />
    </Flex>
  );
}
