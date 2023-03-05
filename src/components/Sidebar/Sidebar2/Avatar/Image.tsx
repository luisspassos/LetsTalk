import { Avatar } from 'components/Avatar';
import { useAuth } from 'contexts/AuthContext';
import { Dispatch, SetStateAction } from 'react';

type ImageProps = {
  setCopiedUsername: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export const Image = ({ setCopiedUsername, username }: ImageProps) => {
  const { user } = useAuth();

  function handleCopyUsername() {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Avatar
      h='60%'
      cursor='pointer'
      src={user?.photoURL}
      onClick={handleCopyUsername}
    />
  );
};

Image.displayName = 'Image';
