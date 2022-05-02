import { ButtonProps } from '@chakra-ui/react';
import { Buttons } from '../Button/Buttons';

type DangerousActionButtonsProps = {
  confirmButtonText: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
};

export function DangerousActionButtons({
  confirmButtonText,
  confirmButtonProps,
  cancelButtonProps,
}: DangerousActionButtonsProps) {
  return (
    <Buttons
      confirmButtonProps={{
        bg: 'red.600',
        ...confirmButtonProps,
      }}
      cancelButtonProps={{
        borderColor: 'blue.900',
        color: 'blue.900',
        colorScheme: 'gray',
        ...cancelButtonProps,
      }}
      confirmButtonText={confirmButtonText}
    />
  );
}
