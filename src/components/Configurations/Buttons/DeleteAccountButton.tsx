import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDeleteAccountModal } from '../../../contexts/Modal/DeleteAccountModalContext';
import { Button } from './Button';

export function DeleteAccountButton() {
  const { onOpen } = useDeleteAccountModal();

  return (
    <Button onClick={onOpen} text='Deletar conta' leftIcon={RiDeleteBin2Line} />
  );
}
