import { ButtonProps, useColorModeValue } from '@chakra-ui/react';
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
  const cancelButtonColor = useColorModeValue('blue.900', 'gray.50');

  return (
    <Buttons
      confirmButtonProps={{
        bg: 'red.600',
        ...confirmButtonProps,
      }}
      cancelButtonProps={{
        borderColor: cancelButtonColor,
        color: cancelButtonColor,
        colorScheme: 'gray',
        ...cancelButtonProps,
      }}
      confirmButtonText={confirmButtonText}
    />
  );
}
