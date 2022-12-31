import { Avatar } from 'components/Avatar';
import { useAuth } from 'contexts/AuthContext';
import { Dispatch, SetStateAction } from 'react';

type ImageProps = {
  setCopiedUsername: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export function Image({ setCopiedUsername, username }: ImageProps) {
  const { user } = useAuth();

  function handleCopyUsername() {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Avatar
      w={['40px', '42px', '48px']}
      h={['40px', '42px', '48px']}
      cursor='pointer'
      src={user?.photoURL}
      onClick={handleCopyUsername}
    />
  );
}
