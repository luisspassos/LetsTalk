import { Button, Icon } from '@chakra-ui/react';
import { memo } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../services/firebase';

function LoginButtonWithGoogleComponent() {
  const router = useRouter();

  async function handleSignInWithGoogle() {
    try {
      const googleProvider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, googleProvider);

      console.log(user);
    } finally {
      router.push('/conversas');
    }
  }

  // const handleSignInWithGoogle = useCallback(async () => {
  //   try {
  //     Router.push('/conversas');
  //     const googleProvider = new GoogleAuthProvider();

  //     const { user } = await signInWithPopup(auth, googleProvider);

  //     if (user) {
  //     }
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.error(err);
  //   }
  // }, []);

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
