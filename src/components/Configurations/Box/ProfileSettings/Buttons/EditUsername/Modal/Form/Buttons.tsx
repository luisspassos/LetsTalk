import { Buttons as ButtonsComponent } from 'components/Modal/Button/Buttons';
import { useRenameUsernameModal } from 'contexts/Modal/RenameUsernameModalContext';
import { IsSubmitting } from 'utils/types';

type ButtonsProps = {
  isSubmitting: IsSubmitting;
};

export function Buttons({ isSubmitting }: ButtonsProps) {
  const { onClose } = useRenameUsernameModal();

  return (
    <ButtonsComponent
      cancelButtonProps={{
        onClick: onClose,
      }}
      confirmButtonProps={{
        isLoading: isSubmitting,
      }}
      confirmButtonText='Trocar'
    />
  );
}
