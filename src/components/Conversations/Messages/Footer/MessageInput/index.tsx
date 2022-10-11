import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

export function MessageInput() {
  return (
    <Flex
      align='center'
      flex='1'
      py='9.5px'
      px='15px'
      fontFamily='Roboto, sans-serif'
      bg={useColorModeValue('white', 'blackAlpha.500')}
      borderRadius='10px'
      border='1px solid'
      borderColor={useColorModeValue('blueAlpha.700', 'whiteAlpha.500')}
      transitionDuration='normal'
      transitionProperty='common'
      _hover={{
        borderColor: useColorModeValue('blueAlpha.700', 'whiteAlpha.600'),
      }}
      _focusWithin={{
        zIndex: 1,
        borderColor: 'blue.300',
        boxShadow: '0 0 0 1px var(--chakra-colors-blue-300)',
      }}
      sx={{
        '*::selection': {
          bgColor: 'blueAlpha.200',
        },
        '.emoji': {
          lineHeight: '16px',
          fontSize: '18px',
          bgRepeat: 'no-repeat',
          bgPos: 'center',
          color: 'transparent',
          fontFamily: 'Noto Emoji, sans-serif',
          caretColor: useColorModeValue(
            'var(--chakra-colors-gray-900)',
            'var(--chakra-colors-gray-50)'
          ),
          '&::selection': {
            color: 'transparent',
          },
        },
      }}
    >
      <Box
        flex='1'
        outline={0}
        placeholder='Mensagem'
        contentEditable
        dir='auto'
        maxH='144px'
        overflow='auto'
      />
    </Flex>
  );
}
