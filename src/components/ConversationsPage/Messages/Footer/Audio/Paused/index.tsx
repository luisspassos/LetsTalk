import { AudioPlayer } from '../AudioPlayer';
import { DeleteButton } from '../DeleteButton';
import { StopButton } from '../StopButton';
import { Wrapper } from '../Wrapper';
import { UnpauseButton } from './UnpauseButton';

export function Paused() {
  return (
    <Wrapper>
      <DeleteButton />
      <AudioPlayer />
      <UnpauseButton />
      <StopButton />
    </Wrapper>
  );
}
