import { Button, Icon } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

function LoginButtonWithGoogleComponent() {
  const router = useRouter();
  const { setUsername } = useAuth();

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } =
        await import('firebase/auth');
      const { auth } = await import('../../services/firebase');
      const googleProvider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const name = user.displayName ?? 'Usuário';

      if (result) {
        const additionalUserInfo = getAdditionalUserInfo(result);

        if (additionalUserInfo?.isNewUser) {
          await setUsername({ user, name });
        }

        router.push('/conversas');
      }
    } catch (err) {
      const { unknownErrorToast } = await import(
        '../../utils/Toasts/unknownErrorToast'
      );
      unknownErrorToast();
    }
  }, [router, setUsername]);

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
