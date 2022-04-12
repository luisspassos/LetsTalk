import { Textarea, InputGroup } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [scrollHeight, setScrollHeight] = useState('');
  const [textareaHeight, setTextareaHeight] = useState<string>('45px');

  function handleAdjustTextareaSize(e: ChangeEvent<HTMLTextAreaElement>) {
    const newScrollHeight = `${e.target.scrollHeight}px`;

    setTextareaHeight('auto');
    setTextareaHeight(newScrollHeight);
    setScrollHeight(newScrollHeight);
  }

  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        h={message === '' ? textareaHeight : scrollHeight}
        py='11.75px'
        value={message}
        borderRadius='15px'
        overflowY='hidden'
        rows={1}
        placeholder='Sua mensagem...'
        _hover={{
          borderColor: 'blueAlpha.700',
        }}
        pr='103px'
        sx={{
          '&::-webkit-scrollbar-thumb': {
            borderWidth: '9px 3px',
          },
        }}
        onChange={(e) => {
          handleAdjustTextareaSize(e);
          setMessage(e.target.value);
        }}
      />
      <InputIconButton
        mr='56px'
        ariaLabel='Emojis'
        Icon={MdOutlineEmojiEmotions}
      />

      <InputIconButton
        mr='15px'
        ariaLabel='Enviar arquivo'
        Icon={AiOutlinePaperClip}
      />
    </InputGroup>
  );
}
