import { Avatar as ChakraAvatar } from 'components/Avatar';

type AvatarProps = {
  photoURL: string | undefined;
};

export function Avatar({ photoURL }: AvatarProps) {
  return (
    <ChakraAvatar flexShrink={0} w='2.75em' src={photoURL} mr='0.786125em' />
  );
}
