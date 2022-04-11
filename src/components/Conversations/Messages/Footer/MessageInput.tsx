import { Textarea, InputGroup } from '@chakra-ui/react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  // altura 45px
  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor='blueAlpha.700'
        bg='white'
        fontFamily='Roboto'
        h='45px'
        minH='0'
        py={0}
        pt='11.75px'
        borderRadius='15px'
        placeholder='Sua mensagem...'
        _hover={{
          borderColor: 'blueAlpha.700',
        }}
        pr='93px'
      />
      <InputIconButton
        mr='46px'
        ariaLabel='Emojis'
        Icon={MdOutlineEmojiEmotions}
      />

      <InputIconButton
        mr='5px'
        ariaLabel='Enviar arquivo'
        Icon={AiOutlinePaperClip}
      />
    </InputGroup>
  );
}
