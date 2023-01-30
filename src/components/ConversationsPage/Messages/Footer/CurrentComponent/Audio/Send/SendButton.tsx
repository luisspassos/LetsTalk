import { Props } from '..';
import { SetIsRecordingAudio } from '../..';
import { Base } from '../../RightButtonBase/Send/Base';

type SendButtonProps = {
  setIsRecordingAudio: SetIsRecordingAudio;
} & Props;

export function SendButton({
  setCurrentComponent,
  setIsRecordingAudio,
}: SendButtonProps) {
  function handleSendAudio() {
    setCurrentComponent('recording');
    setIsRecordingAudio(false);
  }

  return <Base label='Enviar áudio' onClick={handleSendAudio} />;
}
