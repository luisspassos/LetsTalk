import { BsPlayCircle } from 'react-icons/bs';
import { Props } from '..';
import { IconButton } from '../IconButton';

type UnpauseButtonProps = Props;

export function UnpauseButton({ setCurrentComponent }: UnpauseButtonProps) {
  function handleUnpause() {
    setCurrentComponent('recording');
  }

  return (
    <IconButton
      onClick={handleUnpause}
      icon={<BsPlayCircle />}
      aria-label='Despausar'
    />
  );
}
