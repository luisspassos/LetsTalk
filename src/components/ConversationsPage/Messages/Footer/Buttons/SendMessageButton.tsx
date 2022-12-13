import { MdSend } from 'react-icons/md';
import { Button } from '.';
import { useSetMessageInputSize } from '../../../../../hooks/useSetMessageInputSize';
import { SetMessage } from '../Form';

type SendMessageButtonProps = {
  setMessage: SetMessage;
};

export function SendMessageButton({ setMessage }: SendMessageButtonProps) {
  const { setMessageInputSize } = useSetMessageInputSize();

  function handleSendMessage() {
    setMessage('');
    setMessageInputSize();
  }

  return (
    <Button
      onClick={handleSendMessage}
      fontSize='24px'
      icon={MdSend}
      label='Enviar mensagem'
    />
  );
}
