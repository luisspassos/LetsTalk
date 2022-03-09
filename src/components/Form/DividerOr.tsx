import { Flex } from '@chakra-ui/react';

export function DividerOr() {
  return (
    <Flex
      align='center'
      gap='3'
      _before={{
        content: '""',
        bg: 'black',
        h: '1px',
        w: '100%',
        d: 'block',
        opacity: '40%',
      }}
      _after={{
        content: '""',
        bg: 'black',
        h: '1px',
        w: '100%',
        d: 'block',
        opacity: '40%',
      }}
    >
      ou
    </Flex>
  );
}
