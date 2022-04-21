import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Tooltip } from '../../../Tooltip';
import { Divider } from '../Divider';
import { ContactName } from './ContactName';
import { ConversationInfoIconButton } from './ConversationInfo/IconButton';
import { ConversationInfoPopover } from './ConversationInfo/Popover';
import { ConversationsSwitchButton } from './ConversationsSwitchButton';

export function Header() {
  const popoverInitialFocusRef = useRef(null);

  return (
    <>
      <Flex
        flexShrink={0}
        as='header'
        justify='space-between'
        minW={0}
        h={['55px', '70px', '85px']}
        minH={0}
        align='center'
        gap='9px'
      >
        <Flex minW={0} align='center' gap={['12px', '15px', '18px']}>
          <ConversationsSwitchButton />

          <Avatar
            w={['42px', '47px', '55px']}
            h={['42px', '47px', '55px']}
            src='https://github.com/luisspassos.png'
            ignoreFallback
          />

          <VStack minW={0} align='start' spacing={0}>
            <ContactName />
            <Text as='time' fontSize={['12px', '13px', '14px']} opacity='80%'>
              Hoje ás 19:48
            </Text>
          </VStack>
        </Flex>
        <Popover
          initialFocusRef={popoverInitialFocusRef}
          placement='bottom-start'
          isLazy
        >
          <Tooltip
            ariaLabel='Informações da conversa'
            label='Informações da conversa'
            placement='bottom-start'
          >
            <Box display='inline-block'>
              <PopoverTrigger>
                <Box display='inline-block'>
                  <ConversationInfoIconButton />
                </Box>
              </PopoverTrigger>
            </Box>
          </Tooltip>

          <ConversationInfoPopover ref={popoverInitialFocusRef} />
        </Popover>
      </Flex>
      <Divider />
    </>
  );
}
