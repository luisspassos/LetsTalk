import { ConversationDivider } from './List/Conversation/Content/ConversationDivider';

type DividerAboveListProps = {
  padding: string;
};

export function DividerAboveList({ padding }: DividerAboveListProps) {
  return (
    <ConversationDivider
      paddingToBeAdded={padding}
      position='sticky'
      top={0}
      left={0}
      mt={0}
      mx='auto'
    />
  );
}
