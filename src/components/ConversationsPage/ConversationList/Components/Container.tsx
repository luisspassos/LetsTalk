import { ChakraProps, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { iterateEvents, WindowEvent } from 'utils/iterateEvents';

type ContainerProps = {
  children: (padding: string) => JSX.Element;
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

  const styles: ChakraProps = {
    padding: 'max(2%, 1.2rem)',
    border: '1px solid',
  };

  return (
    <Flex
      ref={ref}
      minW='17.625rem'
      w='26%'
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      pt={styles.padding}
      paddingInline={styles.padding}
      direction='column'
      borderRight={styles.border}
      borderColor='whiteAlpha.500'
      as='aside'
    >
      {children(padding)}
    </Flex>
  );
}
