import { useSetMessageInputSize } from 'hooks/useSetMessageInputSize';
import { SetMessage } from './Form';
import { Base } from './RightButtonBase/Send/Base';

type SendMessageButtonProps = {
  setMessage: SetMessage;
};

export function SendMessageButton({ setMessage }: SendMessageButtonProps) {
  const { setMessageInputSize } = useSetMessageInputSize();

  function handleSendMessage() {
    setMessage('');
    setMessageInputSize();
  }

  return <Base onClick={handleSendMessage} label='Enviar mensagem' />;
}
