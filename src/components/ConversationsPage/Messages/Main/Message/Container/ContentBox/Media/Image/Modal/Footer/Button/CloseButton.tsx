import { MdOutlineClose } from 'react-icons/md';
import { Button } from '.';

export function CloseButton() {
  return <Button aria-label='Fechar modal' icon={<MdOutlineClose />} />;
}
