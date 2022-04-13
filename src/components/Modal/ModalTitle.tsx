import { ModalHeader } from '@chakra-ui/react';

type ModalTitleProps = {
  text: string;
};

export function ModalTitle({ text }: ModalTitleProps) {
  return <ModalHeader pb='8px'>{text}</ModalHeader>;
}
