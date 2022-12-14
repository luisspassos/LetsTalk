import { Buttons as ButtonsComponent } from 'components/Modal/Button/Buttons';
import { useAddContactModal } from 'contexts/Modal/AddContactModalContext';
import { IsSubmitting } from 'utils/types';

type ButtonsProps = { isSubmitting: IsSubmitting };

export function Buttons({ isSubmitting }: ButtonsProps) {
  const { onClose } = useAddContactModal();

  return (
    <ButtonsComponent
      confirmButtonProps={{
        isLoading: isSubmitting,
      }}
      cancelButtonProps={{
        onClick: onClose,
      }}
      confirmButtonText='Adicionar'
    />
  );
}
