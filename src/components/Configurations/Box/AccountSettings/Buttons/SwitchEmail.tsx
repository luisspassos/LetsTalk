import { HiOutlineMail } from 'react-icons/hi';
import { useChangeEmailModal } from '../../../../../contexts/Modal/ChangeEmailModalContext';
import { ChangeEmailModal } from '../../../Modals/ChangeEmailModal';
import { Button } from '../../../Buttons/Button';

export function SwitchEmailButton() {
  const { onOpen } = useChangeEmailModal();

  return (
    <>
      <Button onClick={onOpen} text='Trocar email' icon={HiOutlineMail} />
      <ChangeEmailModal />
    </>
  );
}
