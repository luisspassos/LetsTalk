import { AiFillAudio } from 'react-icons/ai';
import { BaseWithTooltip } from '../../RightButtonBase/BaseWithTooltip';

export function RecordButton() {
  function handleRecordAudio() {}

  return (
    <BaseWithTooltip
      onClick={handleRecordAudio}
      icon={AiFillAudio}
      label='Gravar áudio'
    />
  );
}
