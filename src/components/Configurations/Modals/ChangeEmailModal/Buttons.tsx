import { UseFormReturn } from 'react-hook-form/dist/types';
import { useChangeEmailModal } from '../../../../contexts/Modal/ChangeEmailModalContext';
import { Buttons as ButtonsComponent } from '../../../Modal/Button/Buttons';

type IsSubmitting = UseFormReturn['formState']['isSubmitting'];

type ButtonsProps = {
  isSubmitting: IsSubmitting;
};

export function Buttons({ isSubmitting }: ButtonsProps) {
  const { onClose } = useChangeEmailModal();

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
