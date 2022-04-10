import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Circle } from '../../Circle';
import { ConversationDivider } from './ConversationDivider';

type ConversationProps = {
  arr: number[];
  index: number;
};

export function Conversation({ arr, index }: ConversationProps) {
  const lastItem = index === arr.length - 1;

  return (
    <>
      <Flex
        w='100%'
        px='25px'
        alignItems='center'
        py='7px'
        h='85px'
        flexShrink='0'
        cursor='pointer'
        transition='0.2s'
        bg={index === 0 ? 'grayAlpha.500' : undefined}
        _hover={{
          bg: 'grayAlpha.500',
        }}
      >
        <Avatar src='https://github.com/luisspassos.png' mr='10px' />
        <Flex justify='space-between' flex='1'>
          <VStack spacing={0} alignItems='start'>
            <Heading maxW='165px' isTruncated fontSize='17px' fontWeight={400}>
              Guilherme De Castro Alves
            </Heading>
            <Text
              as='small'
              maxW='165px'
              isTruncated
              fontSize='14px'
              opacity='90%'
            >
              ta bommmmmmmmm
            </Text>
          </VStack>
          <VStack spacing='2px' h='100%' align='end'>
            <Text as='time' fontSize='13px' opacity='80%'>
              19:48
            </Text>
            <Circle w='19.5px' fontSize='13px' color='white' bg='gray.500'>
              2
            </Circle>
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}
