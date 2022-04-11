import { Textarea, InputGroup } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  const [scrollHeight, setScrollHeight] = useState<number | string | undefined>(
    0
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        h={scrollHeight >= 200 ? '200px' : scrollHeight}
        minH='45px'
        py='11.75px'
        borderRadius='15px'
        rows={1}
        overflowY={scrollHeight >= 200 ? 'scroll' : 'hidden'}
        placeholder='Sua mensagem...'
        _hover={{
          borderColor: 'blueAlpha.700',
        }}
        ref={textareaRef}
        onChange={() => {
          setScrollHeight('auto');
          setScrollHeight(`${textareaRef.current?.scrollHeight}px`);
          console.log(textareaRef.current?.scrollHeight);
        }}
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
