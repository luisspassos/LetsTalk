import { Image, Portal, Progress, Stack } from '@chakra-ui/react';
import { useLoading } from '../contexts/LoadingContext';

export function Loading() {
  const { isActive } = useLoading();

  return (
    <Portal>
      <Stack
        display={isActive ? 'flex' : 'none'}
        bg='gray.200'
        position='fixed'
        top={0}
        left={0}
        w='100%'
        h='100vh'
        zIndex='2'
        alignItems='center'
        justifyContent='center'
        px='25px'
        spacing={['12px', '18px']}
      >
        <Image
          h={['40px', '50px', '60px']}
          src='./images/logo_light.svg'
          alt="Let's talk"
        />
        <Progress
          w='100%'
          maxW='600px'
          colorScheme='gray'
          size='xs'
          isIndeterminate
        />
      </Stack>
    </Portal>
  );
}
