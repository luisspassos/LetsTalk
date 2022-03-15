import { Button, Icon } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Router from 'next/router';

function LoginButtonWithGoogleComponent() {
  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const { auth } = await import('../../../services/firebase');
      const { GoogleAuthProvider, signInWithPopup } = await import(
        'firebase/auth'
      );

      const googleProvider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, googleProvider);

      if (user) {
        Router.push('/conversas');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, []);

  return (
    <Button
      height='initial'
      whiteSpace='initial'
      py='6px'
      borderWidth={2}
      color='blue.900'
      fontWeight='400'
      bg='white'
      w='100%'
      variant='outline'
      borderColor='blue.900'
      gap='5px'
      fontSize={{ base: '15px', sm: '18px' }}
      justifyContent='start'
      leftIcon={<Icon as={FcGoogle} fontSize={{ base: '28px', sm: '32px' }} />}
      onClick={handleSignInWithGoogle}
    >
      Entrar com o Google
    </Button>
  );
}

export const LoginButtonWithGoogle = memo(LoginButtonWithGoogleComponent);
