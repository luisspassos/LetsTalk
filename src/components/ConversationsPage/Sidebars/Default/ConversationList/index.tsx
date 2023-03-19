import { ChakraProps, useColorModeValue } from '@chakra-ui/react';
import useResizeObserver from '@react-hook/resize-observer';
import { useRef, useState } from 'react';
import { Base } from '../../ConversationsListBase';
import { ContentBasedOnSearch } from './ContentBasedOnSearch';
import { DividerBelowTitle } from './DividerBelowTitle';
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

  useResizeObserver(ref, getPadding);

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

      <DividerBelowTitle />
      <ContentBasedOnSearch padding={padding} />
    </Base>
  );
}
