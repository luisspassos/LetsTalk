import { Textarea, InputGroup, useColorModeValue } from '@chakra-ui/react';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { InputIconButton } from './InputIconButton';

export function MessageInput() {
  // const txHeight = 46;
  // const textareaRef = useRef<HTMLTextAreaElement>(null);

  // // max length 1000

  // useEffect(() => {
  //   if (textareaRef.current.value === '') {
  //     textareaRef.current.setAttribute(
  //       'style',
  //       'height:' + txHeight + 'px;overflow-y:hidden;'
  //     );
  //   } else {
  //     textareaRef.current.setAttribute(
  //       'style',
  //       'height:' + textareaRef.current.scrollHeight + 'px;overflow-y:hidden;'
  //     );
  //   }
  // }, []);

  // function onInput() {
  //   textareaRef.current.style.height = 'auto';
  //   textareaRef.current.style.height = textareaRef.current?.scrollHeight + 'px';
  // }

  return (
    <InputGroup maxW='750px'>
      <Textarea
        resize='none'
        borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
        bg={useColorModeValue('white', 'blackAlpha.500')}
        fontFamily='Roboto'
        h={['39px', '42px', '45px']}
        py={['9.75px', '10.5px', '11.25px']}
        overflowY='hidden'
        borderRadius={['11px', '13px', '15px']}
        rows={1}
        fontSize={['14px', '15px', '16px']}
        placeholder='Sua mensagem...'
        _placeholderShown={{
          textOverflow: 'ellipsis',
        }}
        _placeholder={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        _hover={{
          borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.700'),
        }}
        pr={['73px', '83px', '103px']}
        sx={{
          '&::-webkit-scrollbar-thumb': {
            borderWidth: '9px 3px',
          },
        }}
      />
      <InputIconButton
        mr={['34px', '44px', '56px']}
        ariaLabel='Emojis'
        Icon={MdOutlineEmojiEmotions}
      />

      <InputIconButton
        mr={['5px', '10px', '15px']}
        ariaLabel='Enviar arquivo'
        Icon={AiOutlinePaperClip}
      />
    </InputGroup>
  );
}
