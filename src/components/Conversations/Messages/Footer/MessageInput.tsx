import { Input, InputGroup } from '@chakra-ui/react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  return (
    <InputGroup maxW='750px'>
      <Input
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        borderRadius='15px'
        h='45px'
        placeholder='Sua mensagem...'
        _hover={{
          borderColor: 'blueAlpha.700',
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
