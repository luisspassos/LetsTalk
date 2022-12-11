import { HiOutlineMail } from 'react-icons/hi';
import { useChangeEmailModal } from '../../../../../../contexts/Modal/ChangeEmailModalContext';
import { ChangeEmailModal } from './Modal';

export function SwitchEmail() {
  const { onOpen } = useChangeEmailModal();

  return (
    <>
      <Button onClick={onOpen} text='Trocar email' icon={HiOutlineMail} />
      <ChangeEmailModal />
    </>
  );
}
