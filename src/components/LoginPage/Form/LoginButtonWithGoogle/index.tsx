import { Button, Icon, Spinner, useColorModeValue } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { useAuth } from 'contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const authMethods = {
  signInWithPopup,
}; // for cypress, use this object in this file for tests work

export type AuthMethods = typeof authMethods;

declare global {
  interface Window {
    Cypress?: any;
    auth?: typeof authMethods;
  }
}

export function LoginButtonWithGoogle() {
  useEffect(() => {
    // for tests
    if (window.Cypress) {
      window.auth = authMethods;
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { initializeUser } = useAuth();

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);

      const { auth } = await import('services/firebase');
      const googleProvider = new GoogleAuthProvider();

      const result = await authMethods.signInWithPopup(auth, googleProvider);

      const { user } = result;

      const isNewUser = async () => {
        if (user.displayName === null) return true;

        const { getDoc } = await import('firebase/firestore');
        const { getUserRef } = await import('utils/getUserRef');

        const { userRef } = await getUserRef(user.displayName);

        const usernameSnap = await getDoc(userRef);

        return usernameSnap.exists() ? false : true;
      };

      if (await isNewUser()) {
        const name = user.displayName ?? 'Usuário';

        const { setUsername, addUserInDb } = await import(
          'contexts/AuthContext'
        );
        const { username } = await setUsername({ user, name });

        initializeUser({ username, user });

        await addUserInDb(username, user.uid);
      }

      await router.push('/conversas');
    } catch (err) {
      console.log(err);

      if (
        err instanceof FirebaseError &&
        err.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }

      const { unknownErrorToast } = await import(
        'utils/Toasts/unknownErrorToast'
      );

      unknownErrorToast();
    } finally {
      setIsLoading(false);
    }
  }, [initializeUser, router]);

  return (
    <Button
      data-testid='google login button'
      minH='48px'
      h='auto'
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
