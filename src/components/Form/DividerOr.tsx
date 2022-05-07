import { Flex, useColorModeValue } from '@chakra-ui/react';

export function DividerOr() {
  return (
    <Flex
      align='center'
      gap='3'
      color={useColorModeValue('gray.400', 'gray.50')}
      my={['10px', '15px']}
      fontSize={['16px', '18px']}
      _before={{
        content: '""',
        bg: useColorModeValue('gray.400', 'gray.50'),
        h: '1px',
        w: '100%',
        d: 'block',
        opacity: '80%',
      }}
      _after={{
        content: '""',
        bg: useColorModeValue('gray.400', 'gray.50'),
        h: '1px',
        w: '100%',
        d: 'block',
        opacity: '80%',
      }}
    >
      ou
    </Flex>
  );
}
