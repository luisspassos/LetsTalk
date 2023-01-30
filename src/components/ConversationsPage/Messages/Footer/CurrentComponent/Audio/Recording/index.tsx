import { Wrapper } from '../Wrapper';
import { DeleteButton } from '../DeleteButton';
import { Progress } from './Progress';
import { Duration } from './Duration';
import { StopButton } from '../StopButton';
import { PauseButton } from './PauseButton';
import { Props } from '..';

type RecordingProps = Props;

export function Recording({ setCurrentComponent }: RecordingProps) {
  return (
    <Wrapper>
      <DeleteButton />
      <Progress />
      <Duration />
      <PauseButton setCurrentComponent={setCurrentComponent} />
      <StopButton setCurrentComponent={setCurrentComponent} />
    </Wrapper>
  );
}
