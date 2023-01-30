import { AiFillAudio } from 'react-icons/ai';
import { SetIsRecordingAudio } from '../..';
import { BaseWithTooltip } from '../../RightButtonBase/BaseWithTooltip';

type RecordAudioButtonProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

export function RecordAudioButton({
  setIsRecordingAudio,
}: RecordAudioButtonProps) {
  function handleRecordAudio() {
    setIsRecordingAudio(true);
  }

  return (
    <BaseWithTooltip
      onClick={handleRecordAudio}
      icon={AiFillAudio}
      label='Gravar áudio'
    />
  );
}
