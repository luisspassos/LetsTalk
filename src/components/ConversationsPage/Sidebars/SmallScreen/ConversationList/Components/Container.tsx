import { ChakraProps, Flex, useMediaQuery } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { breakpoints } from 'styles/breakpoints';
import { styles as sharedStyles } from '../..';

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  // set window events

  const [lastBreakpointNum, lastBreakpointMeasure] = breakpoints.last.splitted;
  const newLastBreakpointNum = lastBreakpointNum + 6;
  const newLastBreakpoint = newLastBreakpointNum + lastBreakpointMeasure;
  const [isLastBreakpoint] = useMediaQuery(`(min-width: ${newLastBreakpoint})`);

  const styles: ChakraProps = {
    padding: sharedStyles.px,
    border: '1px solid',
    get borderLeft() {
      return isLastBreakpoint ? styles.border : undefined;
    },
  };

  return (
    <Flex
      overflowY='auto'
      h='100%'
      mx={`-${styles.padding}`}
      direction='column'
      as='aside'
    >
      {children}
    </Flex>
  );
}
