import { Avatar as ChakraAvatar } from '@chakra-ui/react';

type AvatarProps = {
  photoURL: string | undefined;
};

export function Avatar({ photoURL }: AvatarProps) {
  return (
    <ChakraAvatar
      w={['40px', '44px', '48px']}
      h={['40px', '44px', '48px']}
      src={photoURL}
      mr='10px'
      ignoreFallback
    />
  );
}
