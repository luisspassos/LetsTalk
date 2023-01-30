import { Dispatch, SetStateAction, useState } from 'react';
import { Audio } from './Audio';
import { Message } from './Message';

export type SetIsRecordingAudio = Dispatch<SetStateAction<boolean>>;

export function CurrentComponent() {
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  if (isRecordingAudio)
    return <Audio setIsRecordingAudio={setIsRecordingAudio} />;

  return <Message setIsRecordingAudio={setIsRecordingAudio} />;
}
