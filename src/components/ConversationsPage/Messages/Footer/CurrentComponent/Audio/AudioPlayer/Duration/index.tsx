import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { Slider } from './Slider';
import { Text } from './Text';

export function Duration() {
  const { durationInSeconds: duration } = useAudioRecording();

  return (
    <>
      <Slider duration={duration} />
      <Text duration={duration} />
    </>
  );
}
