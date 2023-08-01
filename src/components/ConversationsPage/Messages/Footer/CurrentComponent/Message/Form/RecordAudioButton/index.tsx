import { Spinner, UseToastOptions } from '@chakra-ui/react';
import { useAudioRecording } from 'contexts/Audio/AudioRecordingContext';
import { useEffect, useState } from 'react';
import { AiFillAudio } from 'react-icons/ai';
import { SetIsRecordingAudio } from '../../..';
import { BaseWithTooltip } from '../../../RightButtonBase/BaseWithTooltip';

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

export const errorMessages = {
  UnknownError: 'Ocorreu um erro desconhecido',
  MethodsDontWorkError:
    'Para gravar áudio, use navegadores mais recentes como Chrome e Firefox',
  NotAllowedError: 'A gravação de áudio não foi autorizada',
  default: 'Não foi possível iniciar a gravação de áudio',
};

export function RecordAudioButton({
  setIsRecordingAudio,
}: RecordAudioButtonProps) {
  const { mediaRecorder } = useAudioRecording();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audioIsAlreadyRecording = mediaRecorder.value !== null;

    if (isLoading === false || audioIsAlreadyRecording) return;

    async function continueHandleRecordAudio() {
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

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const newMediaRecorder = new MediaRecorder(stream);

        mediaRecorder.set(newMediaRecorder);

        newMediaRecorder.addEventListener('start', () => {
          setIsRecordingAudio(true);
        });

        newMediaRecorder.start();
      } catch (e) {
        const toast = async (opts: UseToastOptions) => {
          const { toast: base } = await import('utils/Toasts/toast');

          base({
            status: 'error',
            ...opts,
          });
        };

        if (!(e instanceof Error)) {
          await toast({
            description: errorMessages.UnknownError,
            id: 'unknown',
          });

          return;
        }

        const errors: Errors = {
          UnknownError: errorMessages.UnknownError,
          MethodsDontWorkError: errorMessages.MethodsDontWorkError,
          NotAllowedError: errorMessages.NotAllowedError,
          default: {
            title: e.name,
            message: e.message === '' ? errorMessages.default : e.message,
          },
        };

        const error = errors[e.name] || errors.default;

        const hasNoTitle = typeof error === 'string';

        const testId = Object.entries(errors).find(
          ([, value]) => JSON.stringify(value) === JSON.stringify(error)
        );

        if (testId === undefined) throw 'there is no test id';

        const newToast: typeof toast = async (opts) => {
          await toast({
            id: testId[0],
            ...opts,
          });
        };

        if (hasNoTitle) {
          await newToast({
            description: error,
          });

          return;
        }

        await newToast({
          title: error.title,
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }

    continueHandleRecordAudio();
  }, [isLoading, mediaRecorder, setIsRecordingAudio]);

  async function handleRecordAudio() {
    setIsLoading(true);
  }

  return (
    <BaseWithTooltip
      onClick={handleRecordAudio}
      icon={AiFillAudio}
      label='Gravar áudio'
      isLoading={isLoading}
      spinner={
        <Spinner
          data-testid='loading'
          color='currentColor'
          width='1em'
          height='1em'
        />
      }
      data-testid='record audio'
    />
  );
}
