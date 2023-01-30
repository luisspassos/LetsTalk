import { Props } from '..';
import { AudioPlayer } from '../AudioPlayer';
import { DeleteButton } from '../DeleteButton';
import { StopButton } from '../StopButton';
import { Wrapper } from '../Wrapper';
import { UnpauseButton } from './UnpauseButton';

type PausedProps = Props;

export function Paused({ setCurrentComponent }: PausedProps) {
  return (
    <Wrapper>
      <DeleteButton />
      <AudioPlayer />
      <UnpauseButton setCurrentComponent={setCurrentComponent} />
      <StopButton setCurrentComponent={setCurrentComponent} />
    </Wrapper>
  );
}
