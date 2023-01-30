import { Dispatch, SetStateAction, useState } from 'react';
import { AudioButton } from './Audio';
import { SendMessageButton } from './SendMessageButton';
import { MessageInput } from './MessageInput';

export type SetMessage = Dispatch<SetStateAction<string>>;

export function Form() {
  const [message, setMessage] = useState('');

  return (
    <>
      <MessageInput message={message} setMessage={setMessage} />
      {message ? (
        <SendMessageButton setMessage={setMessage} />
      ) : (
        <AudioButton />
      )}
    </>
  );
}
