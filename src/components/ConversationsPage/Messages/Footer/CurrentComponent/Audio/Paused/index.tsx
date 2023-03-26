import { Props } from '..';
import { SetIsRecordingAudio } from '../..';
import { DeleteButton } from '../DeleteButton';
import { StopButton } from '../StopButton';
import { Wrapper } from '../Wrapper';
import { AudioPlayer } from './AudioPlayer';
import { UnpauseButton } from './UnpauseButton';

type PausedProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function Paused({
  setCurrentComponent,
  setIsRecordingAudio,
}: PausedProps) {
  return (
    <Wrapper>
      <DeleteButton
        setIsRecordingAudio={setIsRecordingAudio}
        setCurrentComponent={setCurrentComponent}
      />
      <AudioPlayer />
      <UnpauseButton setCurrentComponent={setCurrentComponent} />
      <StopButton setCurrentComponent={setCurrentComponent} />
    </Wrapper>
  );
}
