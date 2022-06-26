import { IoIosSend } from 'react-icons/io';
import { Button } from '.';
import { HandleSendMessage } from '..';

type SendMessageButtonProps = {
  handleSendMessage: HandleSendMessage;
};

export function SendMessageButton({
  handleSendMessage,
}: SendMessageButtonProps) {
  return (
    <Button
      fontSize='30px'
      icon={IoIosSend}
      label='Enviar mensagem'
      onClick={handleSendMessage}
    />
  );
}
