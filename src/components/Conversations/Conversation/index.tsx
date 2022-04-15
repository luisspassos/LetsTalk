import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useLoading } from '../../../contexts/LoadingContext';
import { Circle } from '../../Circle';
import { ConversationDivider } from './ConversationDivider';

type ConversationProps = {
  arr: number[];
  index: number;
};

export function Conversation({ arr, index }: ConversationProps) {
  const lastItem = index === arr.length - 1;
  const { changeLoadingState } = useLoading();

  return (
    <>
      <Flex
        w='100%'
        px={['19px', '22px', '25px']}
        alignItems='center'
        py='7px'
        h={['65px', '75px', '85px']}
        flexShrink='0'
        cursor='pointer'
        transition='0.2s'
        bg={index === 0 ? 'grayAlpha.500' : undefined}
        _hover={{
          bg: 'grayAlpha.500',
        }}
      >
        <Avatar
          w={['40px', '44px', '48px']}
          h={['40px', '44px', '48px']}
          onLoad={() => changeLoadingState(false)}
          src='https://github.com/luisspassos.png'
          mr='10px'
        />
        <Flex justify='space-between' flex='1'>
          <VStack spacing={['-1px', '-0.5px', 0]} alignItems='start'>
            <Heading
              maxW={['125px', '145px', '165px']}
              isTruncated
              fontSize={['14px', '16px', '17px']}
              fontWeight={400}
            >
              Guilherme De Castro Alves
            </Heading>
            <Text
              as='small'
              maxW={['125px', '145px', '165px']}
              isTruncated
              fontSize={['12px', '13px', '14px']}
              opacity='90%'
            >
              ta bommmmmmmmm
            </Text>
          </VStack>
          <VStack spacing={['1px', '1.5px', '2px']} h='100%' align='end'>
            <Text as='time' fontSize={['11px', '12px', '13px']} opacity='80%'>
              19:48
            </Text>
            <Circle
              px={['1px', '2px', '3px']}
              minW={['13.5px', '16.5px', '19.5px']}
              h={['13.5px', '16.5px', '19.5px']}
              fontSize={['9px', '11px', '13px']}
              lineHeight='1px'
              color='white'
              bg='gray.500'
            >
              2
            </Circle>
          </VStack>
        </Flex>
      </Flex>
      {!lastItem && <ConversationDivider mt={0} />}
    </>
  );
}
