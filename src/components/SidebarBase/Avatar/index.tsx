import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { Tooltip } from './Tooltip';
import {
  Avatar as AvatarComponent,
  AvatarPropsWithoutSrc,
} from 'components/Avatar';
import { Button } from '@chakra-ui/react';

type AvatarProps = AvatarPropsWithoutSrc;

export function Avatar(props: AvatarProps) {
  const [copiedUsername, setCopiedUsername] = useState(false);

  const { user } = useAuth();
  const username = user?.displayName ?? '';

  function handleCopyUsername() {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Tooltip
      copiedUsername={copiedUsername}
      setCopiedUsername={setCopiedUsername}
      username={username}
    >
      <Button
        data-testid='copy username button'
        variant='unstyled'
        borderRadius='50%'
        h='min-content'
      >
        <AvatarComponent
          cursor='pointer'
          {...props}
          src={user?.photoURL}
          onClick={handleCopyUsername}
        />
      </Button>
    </Tooltip>
  );
}
