import { Text } from '@chakra-ui/react';
import {
  RecorderEvent,
  useAudioRecording,
} from 'contexts/Audio/AudioRecordingContext';
import { useEffect } from 'react';

export function Duration() {
  const { iterateRecorderEvents } = useAudioRecording();

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    function startDuration() {}

    function endDuration() {
      if (interval === null) return;

      clearInterval(interval);
    }

    const events: RecorderEvent[] = [
      {
        type: 'start',
        func: startDuration,
      },
      {
        type: 'stop',
        func: endDuration,
      },
    ];

    iterateRecorderEvents('add', events);

    return () => {
      iterateRecorderEvents('remove', events);
    };
  }, [iterateRecorderEvents]);

  return (
    <Text as='time' flexShrink={0}>
      2:38
    </Text>
  );
}
