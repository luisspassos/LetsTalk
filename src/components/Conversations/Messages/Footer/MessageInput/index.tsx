import { Textarea, useColorModeValue } from '@chakra-ui/react';
import useResizeObserver from '@react-hook/resize-observer';
import { useMessageInputRef } from '../../../../../contexts/MessageInputRef';
import { font } from '../../Main/Message/MessageText/Component';

function handleSize(textarea: EventTarget & HTMLTextAreaElement) {
  const maxHeight = 133;
  const scrollHeight = textarea.scrollHeight;

  const getMeasure = (number: number) => `${number}px`;

  if (scrollHeight > maxHeight) {
    textarea.style.height = getMeasure(maxHeight);
    textarea.style.overflowY = 'auto';
  } else {
    const getBorderWidth = () => {
      const styles = getComputedStyle(textarea);

      const getNumber = (string: string) => parseInt(string, 10);

      const borderWidth =
        getNumber(styles.borderTopWidth) + getNumber(styles.borderBottomWidth);

      return borderWidth;
    };

    const borderWidth = getBorderWidth();

    textarea.style.overflowY = 'hidden';
    textarea.style.height = '0';

    const newScrollHeight = textarea.scrollHeight;

    textarea.style.height = getMeasure(newScrollHeight + borderWidth);
  }
}

export function MessageInput() {
  const { ref } = useMessageInputRef();

  useResizeObserver(ref, () => {
    const textarea = ref.current;

    if (!textarea) return;

    handleSize(textarea);
  });

  return (
    <Textarea
      ref={ref}
      onChange={(e) => handleSize(e.target)}
      placeholder='Mensagem'
      rows={1}
      fontFamily={font}
      py='10.5px'
      scrollPadding='10.5px'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      resize='none'
    />
  );
}
