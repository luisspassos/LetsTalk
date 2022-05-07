import { Stack } from '@chakra-ui/react';
import { Message } from './Message';

export function Main() {
  const messages = [
    {
      message: 'oiii',
      id: 1,
      contactMessage: true,
      createdAtFormatted: 'Hoje às 19:47',
    },
    {
      message: 'oiii',
      id: 2,
      contactMessage: false,
      createdAtFormatted: 'Hoje às 19:47',
    },
  ];

  return (
    <Stack
      overflow='auto'
      as='main'
      py={['14px', '17px', '20px']}
      pr={['14px', '17px', '20px']}
      mr={['-14px', '-17px', '-20px']}
      spacing={['6px', '8px', '10px']}
    >
      {messages?.map(({ message, id, contactMessage, createdAtFormatted }) => (
        <Message
          key={id}
          isYourMessage={!contactMessage}
          data={{ createdAt: createdAtFormatted, text: message }}
        />
      ))}
    </Stack>
  );
}
