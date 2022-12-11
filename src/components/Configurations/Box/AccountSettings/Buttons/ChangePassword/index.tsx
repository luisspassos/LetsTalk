import { RiLockPasswordLine } from 'react-icons/ri';
import { useChangePasswordModal } from '../../../../../../contexts/Modal/ChangePasswordModalContext';
import { Modal } from './Modal';

export function ChangePasswordButton() {
  const { onOpen } = useChangePasswordModal();

  return (
    <>
      <Button onClick={onOpen} text='Trocar senha' icon={RiLockPasswordLine} />
      <Modal />
    </>
  );
}
