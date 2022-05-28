import { FaPencilAlt } from 'react-icons/fa';
import { useRenameUsernameModal } from '../../../contexts/Modal/RenameUsernameModalContext';
import { Button } from './Button';

export function EditUsernameButton() {
  const { onOpen } = useRenameUsernameModal();

  return (
    <Button onClick={onOpen} text='Editar nome de perfil' icon={FaPencilAlt} />
  );
}
