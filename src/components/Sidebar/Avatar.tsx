import { useState } from 'react';
import { Tooltip } from '../Tooltip';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

export function Avatar() {
  const [copiedUsername, setCopiedUsername] = useState(false);
  const { user } = useAuth();

  const username = user?.displayName ?? '';

  function handleCopyUsername(username: string) {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }
  // renderizar user no getServerSideProps XDDD
  // react query
  return (
    <Tooltip
      bg={copiedUsername ? 'green.500' : undefined}
      label={
        copiedUsername ? 'Copiado!' : `Copiar nome de usuário | ${username}`
      }
      closeOnClick={false}
      onClose={() => setCopiedUsername(false)}
    >
      <ChakraAvatar
        cursor='pointer'
        src={user?.photoURL ?? undefined}
        onClick={() => handleCopyUsername(username)}
      />
    </Tooltip>
  );
}
