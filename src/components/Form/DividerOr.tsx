import { Flex, useColorModeValue } from '@chakra-ui/react';

export function DividerOr() {
  const line = {
    content: '""',
    bg: useColorModeValue('gray.400', 'gray.50'),
    h: '1px',
    w: '100%',
    d: 'block',
    opacity: '80%',
  };

  return (
    <Flex
      align='center'
      gap='3'
      color={useColorModeValue('gray.400', 'gray.50')}
      my={['10px', '15px']}
      fontSize={['16px', '18px']}
      wordBreak='normal'
      _before={line}
      _after={line}
    >
      ou
    </Flex>
  );
}
