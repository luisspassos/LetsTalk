import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export function LoginButtonWithGoogle() {
  return (
    <Button whiteSpace='initial' py='22px' borderWidth={2} color='blue.900' fontWeight='400' bg='white' w='100%' variant='outline' borderColor='blue.900' gap='5px' fontSize='18px' justifyContent='start' leftIcon={<FcGoogle size={34} />}>
      Entrar com o Google
    </Button>
  );
}
