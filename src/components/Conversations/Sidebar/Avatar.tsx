import { useState } from 'react';
import { Tooltip } from '../Tooltip';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

export function Avatar() {
  const [copiedUsername, setCopiedUsername] = useState(false);

  function handleCopyUsername(username: string) {
    setCopiedUsername(true);
    navigator.clipboard.writeText(username);
  }

  return (
    <Tooltip
      bg={copiedUsername ? 'green.500' : undefined}
      label={
        copiedUsername ? 'Copiado!' : 'Copiar nome de usuário | username#1234'
      }
      closeOnClick={false}
      onClose={() => setCopiedUsername(false)}
    >
      <ChakraAvatar
        cursor='pointer'
        name='Luís Passos'
        src='https://github.com/luisspassos.png'
        onClick={() => handleCopyUsername('Luis#1234')}
      />
    </Tooltip>
  );
}
