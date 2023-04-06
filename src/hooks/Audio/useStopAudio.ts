import { CurrentComponent } from 'components/ConversationsPage/Messages/Footer/CurrentComponent/Audio';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { Dispatch, SetStateAction } from 'react';

type Params = {
  setCurrentComponent: Dispatch<SetStateAction<CurrentComponent>> | undefined;
  componentToDisplay: CurrentComponent;
};

export function useStopAudio({
  componentToDisplay,
  setCurrentComponent,
}: Params) {
  const { mediaRecorder, stopStream } = useAudioRecording();

  function stopAudio() {
    if (setCurrentComponent === undefined) return;

    mediaRecorder.value?.addEventListener('stop', () => {
      setCurrentComponent(componentToDisplay);
    });

    mediaRecorder.value?.stop();

    stopStream();
  }

  return { stopAudio };
}
