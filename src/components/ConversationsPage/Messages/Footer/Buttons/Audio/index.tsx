import { Dispatch, SetStateAction, useState } from 'react';
import { Record } from './Record';
import { Send } from './Send';
import { Stop } from './Stop';

const Buttons = {
  record: Record,
  stop: Stop,
  send: Send,
};

type CurrentButton = keyof typeof Buttons;

export type Props = {
  setCurrentButton: Dispatch<SetStateAction<CurrentButton>>;
};

export function AudioButton() {
  const [currentButton, setCurrentButton] = useState<CurrentButton>('record');
  const Button = Buttons[currentButton];

  return <Button setCurrentButton={setCurrentButton} />;
}
