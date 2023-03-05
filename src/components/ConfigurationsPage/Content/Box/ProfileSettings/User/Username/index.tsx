import { Stack } from '@chakra-ui/react';
import { useAuth } from 'contexts/AuthContext';
import { Id } from './Id';
import { Name } from './Name';

export function Username() {
  const { user } = useAuth();

  const username = user?.displayName?.split('#');

  const name = username?.[0] ?? '';
  const id = username?.[1] ?? '';

  return (
    <Stack minW={0} spacing={0}>
      <Name text={name} />
      <Id text={id} />
    </Stack>
  );
}
