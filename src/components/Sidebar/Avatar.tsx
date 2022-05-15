import { useState } from 'react';
import { Tooltip } from '../Tooltip';
import { Avatar as ChakraAvatar, Text } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

export function Avatar() {
  const [copiedUsername, setCopiedUsername] = useState(false);

  const { user } = useAuth();
  const username = user.username;

  function handleCopyUsername(username: string) {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Tooltip
      bg={copiedUsername ? 'green.500' : undefined}
      label={
        copiedUsername ? (
          'Nome de usuário copiado!'
        ) : (
          <Text isTruncated maxW={['300px', '350px', '400px']}>
            Copiar nome de usuário | {username}
          </Text>
        )
      }
      ariaLabel={
        copiedUsername
          ? 'Nome de usuário copiado!'
          : `Copiar Nome de usuário. ${username}`
      }
      closeOnClick={false}
      onClose={() => setCopiedUsername(false)}
    >
      <ChakraAvatar
        w={['40px', '42px', '48px']}
        h={['40px', '42px', '48px']}
        cursor='pointer'
        src={user.picture}
        onClick={() => handleCopyUsername(username)}
      />
    </Tooltip>
  );
}
