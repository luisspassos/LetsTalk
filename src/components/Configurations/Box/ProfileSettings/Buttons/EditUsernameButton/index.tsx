import { FaPencilAlt } from 'react-icons/fa';
import { useRenameUsernameModal } from '../../../../../../contexts/Modal/RenameUsernameModalContext';

export function EditUsername() {
  const { onOpen } = useRenameUsernameModal();

  return (
    <>
      <Button
        onClick={onOpen}
        text='Editar nome de perfil'
        icon={FaPencilAlt}
      />
      <RenameUsernameModal />
    </>
  );
}
