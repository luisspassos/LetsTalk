import {
  ChakraProps,
  Flex,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { useTabToggle } from 'contexts/TabToggleContext';
import { useEffect, useRef, useState } from 'react';
import { breakpoints } from 'styles/breakpoints';
import { iterateEvents, WindowEvent } from 'utils/iterateEvents';

type ContainerProps = {
  children: (padding: string) => JSX.Element;
};

export function Container({ children }: ContainerProps) {
  const { isOpen } = useTabToggle();

  const ref = useRef<HTMLDivElement>(null);

  const [padding, setPadding] = useState('');

  function getPadding() {
    const element = ref.current;

    if (element === null) return;

    const newPadding = getComputedStyle(element).paddingRight;

    setPadding(newPadding);
  }

  useEffect(() => {
    getPadding();
  }, []);

  // set window events
  useEffect(() => {
    const events: WindowEvent[] = [
      {
        type: 'resize',
        func: getPadding,
      },
    ];

    iterateEvents('add', events, window);

    return () => {
      iterateEvents('remove', events, window);
    };
  }, []);

  const [lastBreakpointNum, lastBreakpointMeasure] = breakpoints.last.splitted;
  const newLastBreakpointNum = lastBreakpointNum + 6;
  const newLastBreakpoint = newLastBreakpointNum + lastBreakpointMeasure;
  const [isLastBreakpoint] = useMediaQuery(`(min-width: ${newLastBreakpoint})`);

  const styles: ChakraProps = {
    padding: 'max(2%, 1.2rem)',
    border: '1px solid',
    get borderLeft() {
      return isLastBreakpoint ? styles.border : undefined;
    },
  };

  return (
    <Flex
      ref={ref}
      display={isOpen ? 'flex' : 'none'}
      minW='17.625rem'
      // w='37%'
      w='100%'
      // h='100%'
      bg={useColorModeValue('gray.200', 'blue.900')}
      pt={styles.padding}
      paddingInline={styles.padding}
      direction='column'
      fontSize='1rem'
      as='aside'
    >
      {children(padding)}
    </Flex>
  );
}
