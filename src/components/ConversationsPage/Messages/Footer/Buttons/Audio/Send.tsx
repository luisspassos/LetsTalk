import { Props } from '.';
import { Base } from '../Send/Base';

type SendProps = Props;

export function Send({ setCurrentButton }: SendProps) {
  function handleSendAudio() {
    setCurrentButton('record');
  }

  return <Base label='Enviar áudio' onClick={handleSendAudio} />;
}
