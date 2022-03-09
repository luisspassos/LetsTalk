import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export function LoginButtonWithGoogle() {
  return <Button leftIcon={<FcGoogle />}>Entrar com o Google</Button>;
}
