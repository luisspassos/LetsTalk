import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider } from '../Divider';

type ConversationDividerProps = ChakraDividerProps;

export function ConversationDivider({ ...props }: ConversationDividerProps) {
  return (
    <Divider
      w='calc(100% - 50px)'
      borderBottomWidth='1px'
      opacity='40%'
      mb={0}
      {...props}
    />
  );
}
