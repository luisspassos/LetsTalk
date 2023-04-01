import { useStopAudio } from 'hooks/Audio/useStopAudio';
import { BsFillStopFill } from 'react-icons/bs';
import { Props } from '.';
import { BaseWithTooltip } from '../RightButtonBase/BaseWithTooltip';

type StopButtonProps = Props;

export function StopButton({ setCurrentComponent }: StopButtonProps) {
  const { stopAudio } = useStopAudio({
    setCurrentComponent,
    componentToDisplay: 'send',
  });

  return (
    <BaseWithTooltip
      onClick={stopAudio}
      icon={BsFillStopFill}
      label='Parar áudio'
      fontSize='30px'
    />
  );
}
