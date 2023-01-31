import { useAudio } from 'contexts/Audio/AudioContext';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useEffect } from 'react';

export function useInitializeAudio(audioSrc: string, index: number) {
  const { setAudio } = useAudio();
  const { setAudiosPlaying } = useAudiosPlaying();

  useEffect(() => {
    const audio = new Audio(audioSrc);

    setAudio({
      element: audio,
      index,
    });

    setAudiosPlaying((prevState) => [...prevState, null]);
  }, [audioSrc, index, setAudio, setAudiosPlaying]);
}
