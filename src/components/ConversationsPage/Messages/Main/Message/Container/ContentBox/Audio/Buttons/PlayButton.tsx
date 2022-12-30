import { BsFillPlayFill } from 'react-icons/bs';
import { Button } from './Button';

export function PlayButton() {
  return <Button icon={<BsFillPlayFill />} aria-label='Tocar áudio' />;
}
