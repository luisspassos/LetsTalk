import {
  Flex,
  Avatar as ChakraAvatar,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';

export function Avatar() {
  const {
    colors: {
      blackAlpha: { [500]: blackAlpha500 },
    },
  } = useTheme();

  return (
    <Flex align='center' my='15px' gap='10px'>
      <ChakraAvatar
        boxShadow={`1px 1px 8px 2px ${blackAlpha500}`}
        src='https://github.com/luisspassos.png'
        size='lg'
      />
      <Stack spacing={0}>
        <Text
          fontSize='18px'
          lineHeight='20px'
          fontWeight='600'
          as='strong'
          isTruncated
          maxW='366px'
          title='luis'
        >
          luis
        </Text>
        <Text color='blackAlpha.800' fontSize='14px' as='small'>
          #9837
        </Text>
      </Stack>
    </Flex>
  );
}
