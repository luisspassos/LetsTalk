import { UseToastOptions } from '@chakra-ui/react';
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
        UnknownError: 'Ocorreu um erro desconhecido',
        MethodsDontWorkError:
          'Para gravar áudio, use navegadores mais recentes como Chrome e Firefox',
        NotAllowedError: 'A gravação de áudio não foi autorizada',
        default: {
          title: e.name,
          message:
            e.message === ''
              ? 'Não foi possível iniciar a gravação de áudio'
              : e.message,
        },
      };

      const error = errors[e.name] || errors.default;

      const { toast } = await import('utils/Toasts/toast');
      const defaultProps: UseToastOptions = {
        status: 'error',
      };

      const hasNoTitle = typeof error === 'string';

      if (hasNoTitle) {
        toast({
          ...defaultProps,
          description: error,
        });

        return;
      }

      toast({
        ...defaultProps,
        title: error.title,
        description: error.message,
      });
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
