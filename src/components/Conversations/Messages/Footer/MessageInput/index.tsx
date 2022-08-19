import { Box, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import { FormEvent } from 'react';

type BeforeInputEvent = FormEvent<HTMLDivElement> & {
  data: string;
};

export function MessageInput() {
  const defaultStyles: any = useStyleConfig('Textarea');

  async function handleInsertValues(e: BeforeInputEvent) {
    const newValue = e.data as string;

    const {} = await import('../../../../../utils/regexs');

    const isEmoji = regexs;
  }

  return (
    <Box
      {...defaultStyles}
      borderRadius='10px'
      py='10.5px'
      fontFamily='Roboto, Noto Emoji, sans-serif'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderColor={useColorModeValue('blueAlpha.700', 'gray.50')}
      contentEditable
      h='auto'
      minH='0'
      maxH='200.5px'
      overflowY='auto'
      _hover={{
        borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.800'),
      }}
      placeholder='Mensagem'
      sx={{
        '&::-webkit-scrollbar-thumb': {
          borderWidth: '9px 3px',
        },
        '.emoji': {
          letterSpacing: '2px',
          bgSize: 'contain',
          bgRepeat: 'no-repeat',
          bgPosition: 'center',
          color: 'transparent',
          caretColor: useColorModeValue(
            'var(--chakra-colors-gray-900)',
            'var(--chakra-colors-gray-50)'
          ),
          '&::selection': {
            color: 'transparent',
            bgColor: 'rgba(0, 0, 255, 0.438)',
          },
        },
      }}
      onBeforeInput={handleInsertValues}
    />
  );
}
