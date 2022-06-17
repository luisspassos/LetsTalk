import { Button, Icon, Spinner, useColorModeValue } from '@chakra-ui/react';
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
      // setIsLoading(true);

      // const { GoogleAuthProvider, signInWithPopup } = await import(
      //   'firebase/auth'
      // );
      // const { auth } = await import('../../services/firebase');
      // const googleProvider = new GoogleAuthProvider();

      // const result = await signInWithPopup(auth, googleProvider);

      // const { user } = result;

      // const name = user.displayName as string;

      // if (result) {
      //   const { getAdditionalUserInfo } = await import('firebase/auth');

      //   const additionalUserInfo = getAdditionalUserInfo(result);

      //   if (additionalUserInfo?.isNewUser) {
      //     await setUsername({ user, name });
      //   }

      await router.push('/test');
      // }
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
      color={useColorModeValue('blue.900', 'gray.50')}
      fontWeight='400'
      bg={useColorModeValue('white', 'gray.800')}
      w='100%'
      variant='outline'
      borderColor={useColorModeValue('blue.900', 'gray.50')}
      gap='5px'
      fontSize={{ base: '16.5px', sm: '18px' }}
      justifyContent='start'
      leftIcon={<Icon as={FcGoogle} fontSize={['28px', '32px']} />}
      onClick={handleSignInWithGoogle}
      isLoading={isLoading}
      loadingText='Entrar com o Google'
      spinner={<Spinner w='15px' h='15px' />}
      _active={{
        bgColor: useColorModeValue(undefined, 'blueAlpha.900'),
      }}
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.900'),
        _disabled: {
          backgroundColor: useColorModeValue('white', 'gray.800'),
        },
      }}
    >
      Entrar com o Google
    </Button>
  );
}

export const LoginButtonWithGoogle = memo(LoginButtonWithGoogleComponent);
