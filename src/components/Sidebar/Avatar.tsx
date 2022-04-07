import { useState } from 'react';
import { Tooltip } from '../Tooltip';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

export function Avatar() {
  const [copiedUsername, setCopiedUsername] = useState(false);
  const { user } = useAuth();

  const username = user?.displayName ?? '';
  const [name] = username.split('#');

  console.log(user);

  function handleCopyUsername(username: string) {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }
  // fazer esse ngc do nome no google button
  // ver verificação de email no getserversideprops
  // renderizar user no getServerSideProps XDDD
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
        name={name}
        src={user?.photoURL ?? undefined}
        onClick={() => handleCopyUsername(username)}
      />
    </Tooltip>
  );
}
