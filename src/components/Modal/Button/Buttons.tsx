import { ButtonProps, HStack } from '@chakra-ui/react';
import { CancelButton } from './CancelButton';
import { ConfirmButton } from './ConfirmButton';

type ButtonsProps = {
  confirmButtonText: string;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
};

export function Buttons({
  cancelButtonProps,
  confirmButtonText,
  confirmButtonProps,
}: ButtonsProps) {
  return (
    <HStack mt='12px' spacing='10px'>
      <CancelButton {...cancelButtonProps} />
      <ConfirmButton {...confirmButtonProps} text={confirmButtonText} />
    </HStack>
  );
}
