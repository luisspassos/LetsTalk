import { useAudio } from 'contexts/Audio/AudioContext';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';

export function useAudioIsPlaying() {
  const { audio } = useAudio();
  const { audiosPlaying } = useAudiosPlaying();

  const index = audio?.index ?? 0;

  const isPlaying = audiosPlaying[index];

  return { isPlaying };
}
