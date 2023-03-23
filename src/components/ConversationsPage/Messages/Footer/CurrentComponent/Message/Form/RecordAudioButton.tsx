import { AiFillAudio } from 'react-icons/ai';
import { SetIsRecordingAudio } from '../..';
import { BaseWithTooltip } from '../../RightButtonBase/BaseWithTooltip';

type RecordAudioButtonProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

type Errors = Record<
  string,
  | string
  | {
      title: string;
      message: string;
    }
>;

export function RecordAudioButton({
  setIsRecordingAudio,
}: RecordAudioButtonProps) {
  async function handleRecordAudio() {
    try {
      const methodsDontWork = !(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      );

      if (methodsDontWork) {
        const message =
          'mediaDevices API or getUserMedia method is not supported in this browser.';

        const e = new Error(message);
        e.name = 'MethodsDontWorkError';

        throw e;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('start', () => {
        setIsRecordingAudio(true);
      });

      mediaRecorder.start();
    } catch (e) {
      if (!(e instanceof Error)) return;

      const errors: Errors = {
        MethodsDontWorkError: 'Use'
        NotAllowedError: 'A gravação de áudio não foi autorizada',
        default: {
          title: e.name,
          message: e.message ?? 'Não foi possível iniciar a gravação de áudio',
        },
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
