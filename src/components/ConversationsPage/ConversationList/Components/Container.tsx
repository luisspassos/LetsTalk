import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  const { isOpen } = useTabToggle();

  return (
    <Flex
      display={isOpen ? 'flex' : 'none'}
      // w={['265px', '295px', '335px']}
      maxW='335px'
      flex='1'
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      p={['19px 19px 0', '22px 22px 0', '25px 25px 0']}
      direction='column'
      borderRight={useColorModeValue(undefined, '1px solid')}
      borderRightColor={useColorModeValue(undefined, 'whiteAlpha.500')}
      as='aside'
    >
      {children}
    </Flex>
  );
}
