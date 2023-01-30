import { MdDelete } from 'react-icons/md';
import { IconButton } from './IconButton';

export function DeleteButton() {
  function handleDeleteAudio() {}

  return (
    <IconButton
      onClick={handleDeleteAudio}
      color='red.300'
      icon={<MdDelete />}
      aria-label='Excluir áudio'
      mr='-10px'
    />
  );
}
