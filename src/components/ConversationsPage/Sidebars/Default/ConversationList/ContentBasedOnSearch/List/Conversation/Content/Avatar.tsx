import { Avatar as ChakraAvatar } from 'components/Avatar';

type AvatarProps = {
  photoURL: string | undefined;
};

export function Avatar({ photoURL }: AvatarProps) {
  return <ChakraAvatar flexShrink={0} w='17.5%' src={photoURL} mr='5%' />;
}
