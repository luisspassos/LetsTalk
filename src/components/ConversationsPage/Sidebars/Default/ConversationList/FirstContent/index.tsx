import { Base } from 'components/ConversationsPage/Sidebars/ConversationsListBase/FirstContent';
import { AddContactButton } from './AddContactButton';
import { Title } from './Title';

export function FirstContent() {
  return (
    <Base>
      <Title />
      <AddContactButton />
    </Base>
  );
}
