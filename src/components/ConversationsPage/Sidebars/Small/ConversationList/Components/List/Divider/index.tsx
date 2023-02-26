import { DividerProps as ChakraDividerProps } from '@chakra-ui/react';
import { Divider as DividerComponent } from 'components/ConversationsPage/Divider';
import { styles } from 'components/ConversationsPage/Sidebars/Small';
import { useMobileConversationListDividerColor } from 'hooks/Colors/useMobileConversationListDividerColor';

type DividerProps = ChakraDividerProps;

export function Divider({ ...rest }: DividerProps) {
  const { color } = useMobileConversationListDividerColor();

  const widthToBeRemoved = styles.px;

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
