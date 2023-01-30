import { BsFillStopFill } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../RightButtonBase/BaseWithTooltip';

type StopButtonProps = Props;

export function StopButton({ setCurrentComponent }: StopButtonProps) {
  function handleStopAudio() {
    setCurrentComponent('send');
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
