import { Buttons } from '../Button/Buttons';

type DangerousActionButtonsProps = {
  confirmButtonText: string;
};

export function DangerousActionButtons({
  confirmButtonText,
}: DangerousActionButtonsProps) {
  return (
    <Buttons
      confirmButtonProps={{
        bg: 'red.600',
      }}
      cancelButtonProps={{
        borderColor: 'blue.900',
        color: 'blue.900',
        colorScheme: 'gray',
      }}
      confirmButtonText={confirmButtonText}
    />
  );
}
