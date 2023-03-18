import { Base } from 'components/ConversationsPage/Sidebars/ConversationsListBase/FirstContent';
import { AddContactButton } from './AddContactButton';
import { Title } from './Title';

export function FirstContent() {
  return (
    <Base pt='1em' pb='.6em'>
      <Title />
      <AddContactButton />
    </Base>
  );
}
