import { Button, Icon, Spinner } from '@chakra-ui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

function LoginButtonWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState(false);

  function clearIsLoadingState() {
    setIsLoading(false);
  }

  useEffect(() => {
    return clearIsLoadingState;
  }, []);

  const router = useRouter();
  const { setUsername } = useAuth();

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);

      const { GoogleAuthProvider, signInWithPopup } = await import(
        'firebase/auth'
      );
      const { auth } = await import('../../services/firebase');
      const googleProvider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, googleProvider);

      const { user } = result;

      const name = user.displayName ?? 'Usuário';

      if (result) {
        const { getAdditionalUserInfo } = await import('firebase/auth');

        const additionalUserInfo = getAdditionalUserInfo(result);

        if (additionalUserInfo?.isNewUser) {
          await setUsername({ user, name });
        }

        await router.push('/conversas');
      }
    } catch (err) {
      const error = String(err);
      if (error.includes('popup-closed-by-user')) return;

      const { unknownErrorToast } = await import(
        '../../utils/Toasts/unknownErrorToast'
      );
      unknownErrorToast();
    } finally {
      setIsLoading(false);
    }
  }, [router, setUsername]);

  return (
    <Button
      h='48px'
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
      fontSize={{ base: '17px', sm: '18px' }}
      justifyContent='start'
      leftIcon={<Icon as={FcGoogle} fontSize={['28px', '32px']} />}
      onClick={handleSignInWithGoogle}
      isLoading={isLoading}
      loadingText='Entrar com o Google'
      spinner={<Spinner w='15px' h='15px' />}
    >
      Entrar com o Google
    </Button>
  );
}

export const LoginButtonWithGoogle = memo(LoginButtonWithGoogleComponent);
