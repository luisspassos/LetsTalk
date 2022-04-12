import { Textarea, InputGroup } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  const txHeight = 46;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // max length 1000

  useEffect(() => {
    if (textareaRef.current.value === '') {
      textareaRef.current.setAttribute(
        'style',
        'height:' + txHeight + 'px;overflow-y:hidden;'
      );
    } else {
      textareaRef.current.setAttribute(
        'style',
        'height:' + textareaRef.current.scrollHeight + 'px;overflow-y:hidden;'
      );
    }
  }, []);

  function onInput() {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current?.scrollHeight + 'px';
  }

  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        h='45px'
        py='11.75px'
        overflowY='hidden'
        borderRadius='15px'
        rows={1}
        ref={textareaRef}
        placeholder='Sua mensagem...'
        _hover={{
          borderColor: 'blueAlpha.700',
        }}
        onChange={onInput}
        pr='103px'
        sx={{
          '&::-webkit-scrollbar-thumb': {
            borderWidth: '9px 3px',
          },
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
