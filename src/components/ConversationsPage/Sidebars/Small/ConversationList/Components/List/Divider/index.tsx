import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider as DividerComponent } from 'components/ConversationsPage/Divider';
import { useMobileConversationListDividerColor } from 'hooks/Colors/useMobileConversationListDividerColor';

type DividerProps = {
  widthToBeRemoved: string;
} & ChakraDividerProps;

export function Divider({ widthToBeRemoved, ...rest }: DividerProps) {
  const { color } = useMobileConversationListDividerColor();

  return (
    <DividerComponent
      borderColor={color}
      w={`calc(100% - ${widthToBeRemoved} - ${widthToBeRemoved})`}
      borderBottomWidth='1px'
      mx='auto'
      mt={0}
      mb={0}
      opacity='1'
      {...rest}
    />
  );
}
