import { Box, Center } from '@chakra-ui/react';
import { Slider } from 'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio/Duration/Slider';
import { useEffect, useRef, useState } from 'react';

export default function Audiaao() {
  const show = useRef(true);

  const [a, setA] = useState(false);

  useEffect(() => {
    setA(true);

    show.current = true;
  }, []);

  return (
    <Center h='100vh'>
      <Box w='200px'>{show.current && <Slider duration={6} />}</Box>
    </Center>
  );
}
