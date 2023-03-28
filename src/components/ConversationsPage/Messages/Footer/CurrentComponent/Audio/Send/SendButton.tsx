import { ResetRecording } from '.';
import { Base } from '../../RightButtonBase/Send/Base';

type SendButtonProps = {
  resetRecording: ResetRecording;
};

export function SendButton({ resetRecording }: SendButtonProps) {
  function handleSendAudio() {
    resetRecording();
  }

  return <Base label='Enviar áudio' onClick={handleSendAudio} />;
}
