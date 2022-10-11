import { Textarea, useColorModeValue } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { font } from '../../Main/Message/MessageText/Component';

export function MessageInput() {
  function handleSize(e: ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target;

    target.style.height = 0;
    target.style.height = `${target.scrollHeight + 2}px`;
  }

  return (
    <Textarea
      overflowY='hidden'
      onChange={handleSize}
      placeholder='Mensagem'
      fontFamily={font}
      rows={1}
      py='10.5px'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      resize='none'
    />
  );
}
