import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect, useState } from 'react';
import { Slider } from './Slider';
import { Text } from './Text';
import getBlobDuration from 'get-blob-duration';

export function Duration() {
  const { audioBlob } = useAudioRecording();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function getDuration() {
      if (audioBlob === null) return;

      const newDuration = await getBlobDuration(audioBlob);

      setDuration(newDuration);
    }

    getDuration();
  }, [audioBlob]);

  return (
    <>
      <Slider duration={duration} />
      <Text duration={duration} />
    </>
  );
}
