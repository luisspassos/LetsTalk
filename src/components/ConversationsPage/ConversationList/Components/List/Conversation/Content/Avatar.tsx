import { Avatar as ChakraAvatar } from 'components/Avatar';

type AvatarProps = {
  photoURL: string | undefined;
};

export function Avatar({ photoURL }: AvatarProps) {
  return (
    <ChakraAvatar
      w='18.5%'
      sx={{
        aspectRatio: '1 / 1',
      }}
      // w={['40px', '44px', '48px']}
      // h={['40px', '44px', '48px']}
      src={photoURL}
      mr='10px'
    />
  );
}
