import { BsPauseFill } from 'react-icons/bs';
import { Button } from './Button';

export function PauseButton() {
  return <Button aria-label='Pausar áudio' icon={<BsPauseFill />} />;
}
