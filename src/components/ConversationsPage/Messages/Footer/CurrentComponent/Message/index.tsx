import { SetIsRecordingAudio } from '..';
import { Form } from './Form';
import { IconButtons } from './LeftButtons';

type MessageProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

export function Message({ setIsRecordingAudio }: MessageProps) {
  return (
    <>
      <IconButtons />
      <Form setIsRecordingAudio={setIsRecordingAudio} />
    </>
  );
}
