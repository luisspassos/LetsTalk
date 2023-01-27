import { BsFillStopFill } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../BaseWithTooltip';

type StopProps = Props;

export function Stop({ setCurrentButton }: StopProps) {
  function handleStopAudio() {
    setCurrentButton('send');
  }

  return (
    <BaseWithTooltip
      onClick={handleStopAudio}
      icon={BsFillStopFill}
      label='Parar áudio'
      fontSize='30px'
    />
  );
}
