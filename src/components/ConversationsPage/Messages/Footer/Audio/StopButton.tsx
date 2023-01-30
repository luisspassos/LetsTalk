import { BsFillStopFill } from 'react-icons/bs';
import { BaseWithTooltip } from '../RightButtonBase/BaseWithTooltip';

export function StopButton() {
  function handleStopAudio() {}

  return (
    <BaseWithTooltip
      onClick={handleStopAudio}
      icon={BsFillStopFill}
      label='Parar áudio'
      fontSize='30px'
    />
  );
}
