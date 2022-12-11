import { useChangePasswordModal } from '../../../../../contexts/Modal/ChangePasswordModalContext';
import { IsSubmitting } from '../../../../../utils/types';
import { Buttons as ButtonsComponent } from '../../../../Modal/Button/Buttons';

type ButtonsProps = {
  isSubmitting: IsSubmitting;
};

export function Buttons({ isSubmitting }: ButtonsProps) {
  const { onClose } = useChangePasswordModal();

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
