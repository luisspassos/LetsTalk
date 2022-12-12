import { Button } from 'components/Configurations/Box/Button';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDeleteAccountModal } from '../../../../../../contexts/Modal/DeleteAccountModalContext';
import { Modal } from './Modal';

export function DeleteAccount() {
  const { onOpen } = useDeleteAccountModal();

  return (
    <>
      <Button onClick={onOpen} text='Deletar conta' icon={RiDeleteBin2Line} />
      <Modal />
    </>
  );
}
