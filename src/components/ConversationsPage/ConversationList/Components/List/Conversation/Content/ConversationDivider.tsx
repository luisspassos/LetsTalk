import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider } from '../../../../../Divider';

type ConversationDividerProps = {
  widthToBeRemoved: string;
} & ChakraDividerProps;

export function ConversationDivider({
  widthToBeRemoved,
  ...rest
}: ConversationDividerProps) {
  return (
    <Divider
      w={`calc(100% - ${widthToBeRemoved} - ${widthToBeRemoved})`}
      borderBottomWidth='1px'
      opacity='40%'
      mb={0}
      {...rest}
    />
  );
}
