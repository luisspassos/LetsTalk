import { Button } from 'components/ConfigurationsPage/Content/Box/Button';
import { FaPencilAlt } from 'react-icons/fa';
import { useRenameUsernameModal } from 'contexts/Modal/RenameUsernameModalContext';
import { Modal } from './Modal';

export function EditUsername() {
  const { onOpen } = useRenameUsernameModal();

  return (
    <>
      <Button
        onClick={onOpen}
        text='Editar nome de perfil'
        icon={FaPencilAlt}
      />
      <Modal />
    </>
  );
}
