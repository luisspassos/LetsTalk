import { Dispatch, SetStateAction, useState } from 'react';
import { SetIsRecordingAudio } from '../..';
import { MessageInput } from './MessageInput';
import { RecordAudioButton } from './RecordAudioButton';
import { SendMessageButton } from './SendMessageButton';

export type SetMessage = Dispatch<SetStateAction<string>>;

type FormProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
};

export function Form({ setIsRecordingAudio }: FormProps) {
  const [message, setMessage] = useState('');

  return (
    <>
      <MessageInput message={message} setMessage={setMessage} />
      {message ? (
        <SendMessageButton setMessage={setMessage} />
      ) : (
        <RecordAudioButton setIsRecordingAudio={setIsRecordingAudio} />
      )}
    </>
  );
}
