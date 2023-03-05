import { useAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { Tooltip } from './Tooltip';
import { Avatar as AvatarComponent } from 'components/Avatar';

export function Avatar() {
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
      <AvatarComponent
        h='60%'
        cursor='pointer'
        src={user?.photoURL}
        onClick={handleCopyUsername}
      />
    </Tooltip>
  );
}
