import {
  Avatar,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Tooltip } from '../../../Tooltip';
import { Divider } from '../Divider';
import { ConversationInfoPopover } from './ConversationInfoPopover';

export function Header() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex
        flexShrink={0}
        as='header'
        justify='space-between'
        h='85px'
        align='center'
      >
        <Flex align='center' gap='18px'>
          <Avatar w='55px' h='55px' src='https://github.com/luisspassos.png' />
          <VStack align='start' spacing={0}>
            <Heading
              maxW='700px'
              isTruncated
              as='h3'
              fontSize='17px'
              fontWeight={400}
            >
              Guilherme DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE CASTRO DE
              CASTRO DE CASTRO DE CASTRO DE CASTRO
            </Heading>
            <Text as='time' fontSize='14px' opacity='80%'>
              Hoje ás 19:48
            </Text>
          </VStack>
        </Flex>
        <ConversationInfoPopover isOpen={isOpen} onClose={onClose}>
          <Tooltip
            ariaLabel='Informações da conversa'
            label='Informações da conversa'
            placement='bottom-start'
          >
            <IconButton
              aria-label='Informações da conversa'
              fontSize='30px'
              icon={<Icon as={IoEllipsisVerticalSharp} />}
              variant='ghost'
              onClick={onOpen}
            />
          </Tooltip>
        </ConversationInfoPopover>
      </Flex>
      <Divider />
    </>
  );
}
