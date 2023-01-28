import { MdDelete } from 'react-icons/md';
import { Button } from './Button';

export function DeleteButton() {
  function handleDeleteAudio() {}

  return (
    <Button
      onClick={handleDeleteAudio}
      color='red.300'
      icon={<MdDelete />}
      aria-label='Excluir áudio'
      mr='-10px'
    />
  );
}
