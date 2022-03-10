import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export function LoginButtonWithGoogle() {
  return (
    <Button w='100%' variant='outline' borderColor='red.100' leftIcon={<FcGoogle />}>
      Entrar com o Google
    </Button>
  );
}
