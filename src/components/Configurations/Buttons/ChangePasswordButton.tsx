import { RiLockPasswordLine } from 'react-icons/ri';
import { useChangePasswordModal } from '../../../contexts/Modal/ChangePasswordModalContext';
import { Button } from './Button';

export function ChangePasswordButton() {
  const { onOpen } = useChangePasswordModal();

  return (
    <Button
      onClick={onOpen}
      text='Trocar senha'
      leftIcon={RiLockPasswordLine}
    />
  );
}
