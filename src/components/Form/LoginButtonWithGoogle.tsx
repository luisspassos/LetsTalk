import { Button, Icon } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useUnknownErrorToast } from '../../hooks/useUnknownErrorToast';

function LoginButtonWithGoogleComponent() {
  const router = useRouter();
  const unknowErrorToast = useUnknownErrorToast();

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import(
        'firebase/auth'
      );
      const { auth } = await import('../../services/firebase');
      const googleProvider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, googleProvider);

      /* istanbul ignore else */
      if (user) {
        router.push('/conversas');
      }
    } catch (err) {
      const { FirebaseError } = await import('firebase/app');

      if (!(err instanceof FirebaseError)) unknowErrorToast();

      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [router, unknowErrorToast]);

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
