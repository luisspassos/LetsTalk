import { ChakraProps, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { breakpoints } from 'styles/breakpoints';
import { iterateEvents, WindowEvent } from 'utils/iterateEvents';

type ChildrenProps = {
  padding: string;
};

type ContainerProps = {
  children: (props: ChildrenProps) => JSX.Element;
};

export function Container({ children }: ContainerProps) {
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
    padding: '1.2em',
    border: '1px solid',
    get borderLeft() {
      return isLastBreakpoint ? styles.border : undefined;
    },
  };

  return (
    <Flex
      ref={ref}
      minW='17.625rem'
      overflowY='auto'
      w='100%'
      h='100%'
      pt={styles.padding}
      direction='column'
      as='aside'
    >
      {children({ padding })}
    </Flex>
  );
}
