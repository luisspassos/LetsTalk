import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider } from '../../../../../Divider';

type ConversationDividerProps = {
  paddingToBeAdded: string;
} & ChakraDividerProps;

export function ConversationDivider({
  paddingToBeAdded,
  ...rest
}: ConversationDividerProps) {
  return (
    <Divider
      marginInline={paddingToBeAdded}
      borderBottomWidth='1px'
      opacity='40%'
      mb={0}
      {...rest}
    />
  );
}
