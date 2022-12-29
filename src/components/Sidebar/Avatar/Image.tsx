import { Avatar } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type ImageProps = {
  setCopiedUsername: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export function Image({ setCopiedUsername, username }: ImageProps) {
  function handleCopyUsername() {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Avatar
      w={['40px', '42px', '48px']}
      h={['40px', '42px', '48px']}
      cursor='pointer'
      src={undefined}
      onClick={handleCopyUsername}
    />
  );
}
