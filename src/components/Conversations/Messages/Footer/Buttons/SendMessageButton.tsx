import { IoIosSend } from 'react-icons/io';
import { Button } from '.';
import { HandleMessageInputSize, HandleSendMessage } from '..';

type SendMessageButtonProps = {
  handleSendMessage: HandleSendMessage;
  handleMessageInputSize: HandleMessageInputSize;
};

export function SendMessageButton({
  handleSendMessage,
  handleMessageInputSize,
}: SendMessageButtonProps) {
  return (
    <Button
      fontSize='30px'
      icon={IoIosSend}
      label='Enviar mensagem'
      onClick={async () => {
        await handleSendMessage();
        await handleMessageInputSize();
      }}
    />
  );
}
