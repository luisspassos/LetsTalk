import { ChakraProps, useColorModeValue } from '@chakra-ui/react';
import { Divider } from 'components/ConversationsPage/Divider';
import { useRef, useState, useEffect } from 'react';
import { WindowEvent, iterateEvents } from 'utils/iterateEvents';
import { Base } from '../../ConversationsListBase';
import { ContentBasedOnSearch } from './Components/ContentBasedOnSearch';
import { FirstContent } from './FirstContent';

export function ConversationList() {
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
    <Base
      componentRef={ref}
      borderRight={styles.border}
      borderColor='whiteAlpha.500'
      minW='17.625rem'
      w='25%'
      h='100vh'
      bg={useColorModeValue('gray.200', 'blue.900')}
      pt={styles.padding}
      paddingInline={styles.padding}
    >
      <FirstContent />

      <Divider />
      <ContentBasedOnSearch padding={padding} />
    </Base>
  );
}
