import { AiFillAudio } from 'react-icons/ai';
import { Props } from '.';
import { BaseWithTooltip } from '../BaseWithTooltip';

type RecordProps = Props;

export function Record({ setCurrentButton }: RecordProps) {
  function handleRecordAudio() {
    setCurrentButton('stop');
  }

  return (
    <BaseWithTooltip
      onClick={handleRecordAudio}
      icon={AiFillAudio}
      label='Gravar áudio'
    />
  );
}
