import { CloseButton } from './Button/CloseButton';
import { DownloadButton } from './Button/DownloadButton';
import {
  Footer as FooterComponent,
  OnClose,
} from 'components/ConversationsPage/Messages/Modal/Content/Footer';

type FooterProps = {
  onClose: OnClose;
};

export function Footer({ onClose }: FooterProps) {
  return (
    <FooterComponent onClose={onClose}>
      <CloseButton />
      <DownloadButton />
    </FooterComponent>
  );
}
