import { Textarea, InputGroup } from '@chakra-ui/react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        h='45px'
        py='11.75px'
        borderRadius='15px'
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
