import { Stack } from '@chakra-ui/react';
import { getNameAndId, useAuth } from 'contexts/AuthContext';
import { Id } from './Id';
import { Name } from './Name';

export function Username() {
  const { user } = useAuth();

  if (user?.displayName === undefined || user.displayName === null) return null;

  const { name, id } = getNameAndId(user.displayName);

  return (
    <Stack minW={0} spacing={0}>
      <Name text={name} />
      <Id text={id} />
    </Stack>
  );
}
