import { Stack } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext';
import { Id } from './Id';
import { Name } from './Name';

export function Username() {
  const { user } = useAuth();

  if (!user?.nameAndId) return null;

  const { name, id = '' } = user.nameAndId;

  return (
    <Stack minW={0} spacing={0} data-testid='username'>
      <Name text={name} />
      <Id text={id} />
    </Stack>
  );
}
