import {
  Flex,
  Avatar as ChakraAvatar,
  Stack,
  Text,
  useTheme,
  useColorModeValue,
} from '@chakra-ui/react';

export function Avatar() {
  const {
    colors: {
      blackAlpha: { [500]: blackAlpha500 },
    },
  } = useTheme();

  return (
    <Flex
      display='flex'
      align='center'
      my={['11px', '13px', '15px']}
      gap='10px'
    >
      <ChakraAvatar
        boxShadow={`1px 1px 8px 2px ${blackAlpha500}`}
        src='https://github.com/luisspassos.png'
        w={['54px', '59px', '64px']}
        h={['54px', '59px', '64px']}
      />
      <Stack minW={0} spacing={0}>
        <Text
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          maxW='316px'
          w='100%'
          fontSize={['16px', '17px', '18px']}
          lineHeight='20px'
          fontWeight='600'
          as='strong'
          title='luis'
        >
          luissssssssssssssssssssssssssssssssssssssssss
        </Text>
        <Text
          color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
          fontSize={['12px', '13px', '14px']}
          as='small'
        >
          #9837
        </Text>
      </Stack>
    </Flex>
  );
}
