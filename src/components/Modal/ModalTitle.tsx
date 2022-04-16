import { ModalHeader } from '@chakra-ui/react';

type ModalTitleProps = {
  text: string;
};

export function ModalTitle({ text }: ModalTitleProps) {
  return (
    <ModalHeader fontSize={['18px', '19px', '20px']} pb={['4px', '6px', '8px']}>
      {text}
    </ModalHeader>
  );
}
