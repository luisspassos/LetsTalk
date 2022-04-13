import { ButtonProps, HStack } from '@chakra-ui/react';
import { CancelButton } from './CancelButton';
import { ConfirmButton } from './ConfirmButton';

type ButtonsProps = {
  confirmButtonText: string;
  cancelButtonProps?: ButtonProps;
};

export function Buttons({
  cancelButtonProps,
  confirmButtonText,
}: ButtonsProps) {
  return (
    <HStack mt='12px' spacing='10px'>
      <CancelButton {...cancelButtonProps} />
      <ConfirmButton text={confirmButtonText} />
    </HStack>
  );
}
