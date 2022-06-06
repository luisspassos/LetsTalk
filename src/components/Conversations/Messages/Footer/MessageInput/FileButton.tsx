import { AiOutlinePaperClip } from 'react-icons/ai';
import { InputIconButton } from './InputIconButton';

export function FileButton() {
  return (
    <InputIconButton ariaLabel='Enviar arquivo' Icon={AiOutlinePaperClip} />
  );
}
