import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { Image } from './Image';
import { Tooltip } from './Tooltip';

export function Avatar() {
  const [copiedUsername, setCopiedUsername] = useState(false);

  const { user } = useAuth();
  const username = user?.displayName ?? '';

  return (
    <Tooltip
      copiedUsername={copiedUsername}
      setCopiedUsername={setCopiedUsername}
      username={username}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image setCopiedUsername={setCopiedUsername} username={username} />
    </Tooltip>
  );
}
