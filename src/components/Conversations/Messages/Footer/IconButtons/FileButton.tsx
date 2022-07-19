import { AiOutlinePaperClip } from 'react-icons/ai';
import { InputIconButton } from '.';

export function FileButton() {
  return (
    <InputIconButton ariaLabel='Enviar arquivo' Icon={AiOutlinePaperClip} />
  );
}
