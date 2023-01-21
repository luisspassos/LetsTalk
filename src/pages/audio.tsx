import { Center } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Audio = dynamic(
  () =>
    import(
      'components/ConversationsPage/Messages/Main/Message/Container/ContentBox/Audio'
    ).then((mod) => mod.AudioComponent),
  {
    ssr: false,
  }
);

export default function Audiaao() {
  return (
    <Center>
      {/* <Message
        maxW='350px'
        w='100%'
        contactMessage={false}
        messageIndex={20}
        sentIn='20:00'
      >
        <Audio />
      </Message> */}
    </Center>
  );
}
