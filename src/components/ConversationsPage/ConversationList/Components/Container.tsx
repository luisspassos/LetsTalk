import {
  ChakraProps,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { useEffect, useRef } from 'react';
import { breakpoints } from 'styles/breakpoints';

type ContainerProps = {
  children: (padding: string) => JSX.Element;
};

export function Container({ children }: ContainerProps) {
  const { isOpen } = useTabToggle();

  const [lastBreakpoint] = useMediaQuery(`(min-width: ${breakpoints.last})`);

  const styles: ChakraProps = {
    padding: '2%',
    border: '1px solid',
    get borderLeft() {
      return lastBreakpoint ? styles.border : undefined;
    },
  };

  const ref = useRef<HTMLDivElement>(null);
  const padding = useRef('');

  useEffect(() => {
    function getPadding() {
      const element = ref.current;

      if (element === null) return;

      const newPadding = getComputedStyle(element).paddingRight;

      padding.current = newPadding;
    }

    getPadding();
  }, []);

  return (
    <Flex
      ref={ref}
      display={isOpen ? 'flex' : 'none'}
      minW='282px'
      w='26%'
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      pt={styles.padding}
      paddingInline={styles.padding}
      direction='column'
      borderRight={styles.border}
      borderLeft={styles.borderLeft}
      borderColor='whiteAlpha.500'
      as='aside'
    >
      {children(padding.current)}
    </Flex>
  );
}
