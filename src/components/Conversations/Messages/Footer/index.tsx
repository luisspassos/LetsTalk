import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { MessageInput } from './MessageInput';
import { AiFillAudio } from 'react-icons/ai';
import { Tooltip } from '../../../Tooltip';

export function Footer() {
  return (
    <Box mt='auto'>
      <Divider />
      <Flex as='footer' h='80px' align='center' justify='center'>
        <MessageInput />
        <Tooltip ariaLabel='Gravar áudio' label='Gravar áudio' placement='top'>
          <IconButton
            aria-label='Gravar áudio'
            icon={<Icon as={AiFillAudio} />}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
