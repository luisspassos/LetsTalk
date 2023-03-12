import { ConversationProps } from '.';
import { Divider as DividerComponent } from '../Divider';

type LastItemProps = Pick<ConversationProps, 'numberOfConversations' | 'index'>;

type DividerProps = {
  widthToBeRemoved: string;
} & LastItemProps;

export function Divider({
  index,
  numberOfConversations,
  widthToBeRemoved,
}: DividerProps) {
  const lastItem = index === numberOfConversations - 1;

  if (lastItem === true) return null;

  return <DividerComponent widthToBeRemoved={widthToBeRemoved} />;
}
