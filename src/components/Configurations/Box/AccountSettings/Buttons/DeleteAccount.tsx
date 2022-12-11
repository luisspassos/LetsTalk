import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDeleteAccountModal } from '../../../../../contexts/Modal/DeleteAccountModalContext';
import { DeleteAccountModal } from '../../../Modals/DeleteAccountModal';
import { Button } from '../../../Buttons/Button';

export function DeleteAccountButton() {
  const { onOpen } = useDeleteAccountModal();

  return (
    <>
      <Button onClick={onOpen} text='Deletar conta' icon={RiDeleteBin2Line} />
      <DeleteAccountModal />
    </>
  );
}
