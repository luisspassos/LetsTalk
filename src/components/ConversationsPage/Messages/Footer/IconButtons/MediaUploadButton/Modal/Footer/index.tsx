import { CancelButton } from './Buttons/CancelButton';
import { SendButton } from './Buttons/SendButton';
import { Footer as FooterComponent } from 'components/ConversationsPage/Messages/Modal/Content/Footer';

export function Footer() {
  return (
    <FooterComponent justify='end'>
      <CancelButton />
      <SendButton />
    </FooterComponent>
  );
}
