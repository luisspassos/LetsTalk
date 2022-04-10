import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import { Divider } from '../Divider';
import { MessageInput } from './MessageInput';
import { AiFillAudio } from 'react-icons/ai';
import { Tooltip } from '../../../Tooltip';

export function Footer() {
  return (
    <Box mt='auto'>
      <Divider />
      <Flex as='footer' h='80px' align='center' justify='start' pl='10px'>
        <MessageInput />
        <Tooltip
          hasArrow={false}
          ariaLabel='Gravar áudio'
          label='Gravar áudio'
          placement='top'
        >
          <IconButton
            fontSize='22px'
            w='45px'
            h='45px'
            borderRadius='15px'
            ml='15px'
            color='white'
            bg='blue.900'
            aria-label='Gravar áudio'
            icon={<Icon as={AiFillAudio} />}
            _hover={{
              bg: 'blue.900',
            }}
            _active={{
              bg: 'blueAlpha.900',
            }}
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
