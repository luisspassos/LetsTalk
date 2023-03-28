import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { Props } from '..';
import { SetIsRecordingAudio } from '../..';
import { AudioPlayer } from '../AudioPlayer';
import { Wrapper } from '../Wrapper';
import { DeleteButton } from './DeleteButton';
import { SendButton } from './SendButton';

export type ResetRecording = () => void;

type SendProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function Send({ setCurrentComponent, setIsRecordingAudio }: SendProps) {
  const { resetAudioRecording } = useAudioRecording();

  function resetRecording() {
    setCurrentComponent('recording');
    setIsRecordingAudio(false);
    resetAudioRecording();
  }

  return (
    <Wrapper>
      <DeleteButton resetRecording={resetRecording} />
      <AudioPlayer />
      <SendButton resetRecording={resetRecording} />
    </Wrapper>
  );
}
