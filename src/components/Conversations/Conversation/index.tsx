import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Circle } from '../../Circle';
import { ConversationDivider } from './ConversationDivider';

export function Conversation() {
  return (
    <>
      <Flex w='100%' px='25px' alignItems='center' py='7px'>
        <Avatar src='https://github.com/luisspassos.png' mr='10px' />
        <Flex justify='space-between' flex='1'>
          <VStack spacing={0} alignItems='start'>
            <Heading fontSize='17px' fontWeight={400}>
              Guilherme
            </Heading>
            <Text as='small' fontSize='14px' opacity='90%'>
              ta bom
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
      <ConversationDivider mt={0} />
    </>
  );
}
