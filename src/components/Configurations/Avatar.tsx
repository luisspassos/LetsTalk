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
      blackAlpha: { [600]: blackAlpha600 },
    },
  } = useTheme();

  return (
    <Flex align='center' my='15px' gap='10px'>
      <ChakraAvatar
        boxShadow={`1px 1px 8px 2px ${blackAlpha600}`}
        src='https://github.com/luisspassos.png'
        size='lg'
      />
      <Stack spacing={0}>
        <Text as='strong' isTruncated maxW='400px'>
          luisssssssssssssssssssssssssssssssssssssssssssssss
        </Text>
        <Text as='small'>#9837</Text>
      </Stack>
    </Flex>
  );
}
