import { MdOutlineMessage, MdMessage } from 'react-icons/md';
import { DefaultProps } from '.';
import { Route } from '..';

type ConversationsButtonProps = DefaultProps;

export function ConversationsButton({ Base }: ConversationsButtonProps) {
  return (
    <Route
      Base={Base}
      icon={{ default: MdOutlineMessage, selected: MdMessage }}
      page='conversas'
      aria-label='Mensagens'
    />
  );
}
