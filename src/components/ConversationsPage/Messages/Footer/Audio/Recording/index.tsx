import { Wrapper } from '../Wrapper';
import { DeleteButton } from '../DeleteButton';
import { Progress } from './Progress';
import { Duration } from './Duration';
import { StopButtton } from '../StopButton';

export function Recording() {
  return (
    <Wrapper>
      <DeleteButton />
      <Progress />
      <Duration />
      <StopButtton />
    </Wrapper>
  );
}
