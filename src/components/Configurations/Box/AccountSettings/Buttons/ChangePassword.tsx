import { RiLockPasswordLine } from 'react-icons/ri';
import { useChangePasswordModal } from '../../../../../contexts/Modal/ChangePasswordModalContext';
import { ChangePasswordModal } from '../../../Modals/ChangePasswordModal';
import { Button } from '../../../Buttons/Button';

export function ChangePasswordButton() {
  const { onOpen } = useChangePasswordModal();

  return (
    <>
      <Button onClick={onOpen} text='Trocar senha' icon={RiLockPasswordLine} />
      <ChangePasswordModal />
    </>
  );
}
