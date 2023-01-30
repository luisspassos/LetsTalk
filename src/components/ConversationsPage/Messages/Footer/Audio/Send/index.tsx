import { DeleteAccount } from 'components/ConfigurationsPage/Box/AccountSettings/Buttons/DeleteAccount';
import { AudioPlayer } from '../AudioPlayer';
import { Wrapper } from '../Wrapper';
import { SendButton } from './SendButton';

export function Send() {
  return (
    <Wrapper>
      <DeleteAccount />
      <AudioPlayer />
      <SendButton />
    </Wrapper>
  );
}
