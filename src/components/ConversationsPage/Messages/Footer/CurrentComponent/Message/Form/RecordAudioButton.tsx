import { AiFillAudio } from 'react-icons/ai';
import { SetIsRecordingAudio } from '../..';
import { BaseWithTooltip } from '../../RightButtonBase/BaseWithTooltip';

type RecordAudioButtonProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

type Errors = Record<string, string>;

export function RecordAudioButton({
  setIsRecordingAudio,
}: RecordAudioButtonProps) {
  async function handleRecordAudio() {
    const methodsDontWorkMessage =
      'mediaDevices API or getUserMedia method is not supported in this browser.';

    try {
      const methodsDontWork = !(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      );

      if (methodsDontWork) {
        return Promise.reject(new Error(methodsDontWorkMessage));
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('start', () => {
        setIsRecordingAudio(true);
      });

      mediaRecorder.start();
    } catch (e) {
      if (!(e instanceof Error)) return;

      if (e.message.includes(methodsDontWorkMessage)) {
        return;
      }

      const errors: Errors = {
        NotAllowedError: 'A gravação de áudio não foi autorizada',
        default: `${e.name} Não foi possível iniciar a gravação de áudio`,
      };

      const error = errors[e.name] || errors.default;
    }
  }

  return (
    <BaseWithTooltip
      onClick={handleRecordAudio}
      icon={AiFillAudio}
      label='Gravar áudio'
    />
  );
}
