import { useColorModeValue } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { IconButton } from './IconButton';

export function DeleteButton() {
  function handleDeleteAudio() {}

  return (
    <IconButton
      onClick={handleDeleteAudio}
      color={useColorModeValue('red.600', 'red.300')}
      icon={<MdDelete />}
      aria-label='Excluir áudio'
    />
  );
}
