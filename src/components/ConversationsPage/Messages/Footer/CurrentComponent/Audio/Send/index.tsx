import { Props } from '..';
import { SetIsRecordingAudio } from '../..';
import { AudioPlayer } from '../AudioPlayer';
import { DeleteButton } from '../DeleteButton';
import { Wrapper } from '../Wrapper';
import { SendButton } from './SendButton';

type SendProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function Send({ setCurrentComponent, setIsRecordingAudio }: SendProps) {
  return (
    <Wrapper>
      <DeleteButton
        setIsRecordingAudio={setIsRecordingAudio}
        setCurrentComponent={setCurrentComponent}
      />
      <AudioPlayer />
      <SendButton
        setIsRecordingAudio={setIsRecordingAudio}
        setCurrentComponent={setCurrentComponent}
      />
    </Wrapper>
  );
}
