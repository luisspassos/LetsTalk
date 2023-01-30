import { BsPauseCircle } from 'react-icons/bs';
import { IconButton } from '../IconButton';

export function PauseButton() {
  function handlePause() {}

  return (
    <IconButton
      onClick={handlePause}
      icon={<BsPauseCircle />}
      aria-label='Pausar'
    />
  );
}
