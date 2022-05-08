import { Icon, IconButton, useColorModeValue } from '@chakra-ui/react';
import { Tooltip } from '../../../Tooltip';
import { AiFillAudio } from 'react-icons/ai';

export function RecordButtonAudio() {
  const bg = useColorModeValue('blue.900', 'gray.400');

  return (
    <Tooltip
      hasArrow={false}
      ariaLabel='Gravar áudio'
      label='Gravar áudio'
      placement='top'
    >
      <IconButton
        flexShrink={0}
        fontSize='22px'
        w='45px'
        h='45px'
        borderRadius={['11px', '13px', '15px']}
        ml={['11px', '13px', '15px']}
        color='white'
        bg={bg}
        aria-label='Gravar áudio'
        icon={<Icon as={AiFillAudio} />}
        _hover={{
          bg: bg,
        }}
        _active={{
          bg: useColorModeValue('blueAlpha.900', 'gray.500'),
        }}
      />
    </Tooltip>
  );
}
