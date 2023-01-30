import { BsPlayCircle } from 'react-icons/bs';
import { IconButton } from '../IconButton';

export function UnpauseButton() {
  function handleUnpause() {}

  return (
    <IconButton
      onClick={handleUnpause}
      icon={<BsPlayCircle />}
      aria-label='Despausar'
    />
  );
}
