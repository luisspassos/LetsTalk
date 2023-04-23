import { Conversations } from 'components/ConversationsPage';
import { GetServerSideProps } from 'next';
import { redirectToUserIfNoUser } from 'utils/redirectToHomeIfNoUser';
import { useOnAuthStateChanged } from 'hooks/useOnAuthStateChanged';
import { useCheckIfUserHasBeenDeleted } from 'hooks/useCheckIfUserAccHasBeenDeleted';
import { useHandleUserOnlineAt } from 'hooks/useHandleUserOnlineAt';
import { Contexts } from 'components/ConversationsPage/Contexts';

export default function ConversationsPage() {
  useOnAuthStateChanged();
  const { onlineAtEvents } = useHandleUserOnlineAt();
  useCheckIfUserHasBeenDeleted(onlineAtEvents);

  return (
    <Contexts>
      <Conversations />
    </Contexts>
  );
}

export const getServerSideProps: GetServerSideProps = redirectToUserIfNoUser;
