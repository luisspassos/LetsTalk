import { Textarea, useColorModeValue } from '@chakra-ui/react';
import useResizeObserver from '@react-hook/resize-observer';
import { useMessageInputRef } from 'contexts/MessageInputRef';
import { useSetMessageInputSize } from 'hooks/useSetMessageInputSize';
import { SetMessage } from '../../Form';

export const fontFamily = 'Roboto, Noto Color Emoji, sans-serif';

type MessageInputProps = {
  message: string;
  setMessage: SetMessage;
};

export function MessageInput({ setMessage, message }: MessageInputProps) {
  const { ref } = useMessageInputRef();
  const { setMessageInputSize } = useSetMessageInputSize();

  useResizeObserver(ref, setMessageInputSize);

  return (
    <Textarea
      ref={ref}
      onChange={(e) => {
        setMessageInputSize();
        setMessage(e.target.value);
      }}
      value={message}
      placeholder='Mensagem'
      rows={1}
      fontFamily='message'
      py='10.5px'
      scrollPadding='10.5px'
      borderColor={useColorModeValue('blackAlpha.500', undefined)}
      bg={useColorModeValue('white', 'blackAlpha.500')}
      resize='none'
    />
  );
}
