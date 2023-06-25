import { Conversations } from 'components/ConversationsPage';
import { useOnAuthStateChanged } from 'hooks/useOnAuthStateChanged';
import { useCheckIfUserHasBeenDeleted } from 'hooks/useCheckIfUserAccHasBeenDeleted';
import { useHandleUserOnlineAt } from 'hooks/useHandleUserOnlineAt';
import { GetServerSideProps } from 'next';
import { redirectToHomeIfNoUser } from 'utils/redirectToHomeIfNoUser';

export default function ConversationsPage() {
  useOnAuthStateChanged();
  const { onlineAtEvents } = useHandleUserOnlineAt();
  useCheckIfUserHasBeenDeleted(onlineAtEvents);

  return <Conversations />;
}

export const getServerSideProps: GetServerSideProps = redirectToHomeIfNoUser;
