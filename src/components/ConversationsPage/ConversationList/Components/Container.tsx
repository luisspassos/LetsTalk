import {
  ChakraProps,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { ReactNode } from 'react';
import { breakpoints } from 'styles/breakpoints';

type ContainerProps = {
  children: ReactNode;
};

export const padding = '2%';

export function Container({ children }: ContainerProps) {
  const { isOpen } = useTabToggle();

  const [lastBreakpoint] = useMediaQuery(`(min-width: ${breakpoints.last})`);

  const border = '1px solid';
  const borderLeft = lastBreakpoint ? border : undefined;

  return (
    <Flex
      display={isOpen ? 'flex' : 'none'}
      minW='282px'
      w='26%'
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      // p={['19px 19px 0', '22px 22px 0', '25px 25px 0']}
      pt={padding}
      paddingInline={padding}
      direction='column'
      borderRight={border}
      borderLeft={borderLeft}
      borderColor='whiteAlpha.500'
      as='aside'
    >
      {children}
    </Flex>
  );
}
