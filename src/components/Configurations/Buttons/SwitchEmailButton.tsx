import { HiOutlineMail } from 'react-icons/hi';
import { useChangeEmailModal } from '../../../contexts/Modal/ChangeEmailModalContext';
import { Button } from './Button';

export function SwitchEmailButton() {
  const { onOpen } = useChangeEmailModal();

  return (
    <Button onClick={onOpen} text='Trocar email' leftIcon={HiOutlineMail} />
  );
}
