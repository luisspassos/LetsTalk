import { CancelButton } from './Buttons/CancelButton';
import { SendButton } from './Buttons/SendButton';
import {
  Footer as FooterComponent,
  OnClose,
} from 'components/ConversationsPage/Messages/Modal/Content/Footer';

type FooterProps = {
  onClose: OnClose;
};

export function Footer({ onClose }: FooterProps) {
  return (
    <FooterComponent onClose={onClose} justify='end'>
      <CancelButton />
      <SendButton />
    </FooterComponent>
  );
}
