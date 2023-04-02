import { gap, Wrapper } from '../Wrapper';
import { DeleteButton } from '../DeleteButton';
import { Progress } from './Progress';
import { Duration } from './Duration';
import { StopButton } from '../StopButton';
import { PauseButton } from './PauseButton';
import { Props } from '..';
import { SetIsRecordingAudio } from '../..';
import { Flex } from '@chakra-ui/react';

type RecordingProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function Recording({
  setCurrentComponent,
  setIsRecordingAudio,
}: RecordingProps) {
  return (
    <Wrapper>
      <DeleteButton
        setIsRecordingAudio={setIsRecordingAudio}
        setCurrentComponent={setCurrentComponent}
      />
      <Flex minW={0} align='center' gap={gap} justify='end'>
        <Progress />
        <Duration />
      </Flex>
      <PauseButton setCurrentComponent={setCurrentComponent} />
      <StopButton setCurrentComponent={setCurrentComponent} />
    </Wrapper>
  );
}
