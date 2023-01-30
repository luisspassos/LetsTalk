import { BsPauseCircle } from 'react-icons/bs';
import { Props } from '..';
import { IconButton } from '../IconButton';

type PauseButtonProps = Props;

export function PauseButton({ setCurrentComponent }: PauseButtonProps) {
  function handlePause() {
    setCurrentComponent('paused');
  }

  return (
    <IconButton
      onClick={handlePause}
      icon={<BsPauseCircle />}
      aria-label='Pausar'
    />
  );
}
