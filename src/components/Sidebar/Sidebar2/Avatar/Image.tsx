import { Avatar } from 'components/Avatar';
import { useAuth } from 'contexts/AuthContext';
import { Dispatch, forwardRef, SetStateAction } from 'react';

type ImageProps = {
  setCopiedUsername: Dispatch<SetStateAction<boolean>>;
  username: string;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ setCopiedUsername, username }, ref) => {
    const { user } = useAuth();

    function handleCopyUsername() {
      setCopiedUsername(true);
      navigator.clipboard.writeText(username);
    }

    return (
      <Avatar
        // w='100%'
        // h='100%'
        w='12px'
        cursor='pointer'
        src={user?.photoURL}
        onClick={handleCopyUsername}
        ref={ref}
      />
    );
  }
);

Image.displayName = 'Image';
