import { Avatar as ChakraAvatar } from 'components/Avatar';

type AvatarProps = {
  photoURL: string | undefined;
};

export function Avatar({ photoURL }: AvatarProps) {
  return <ChakraAvatar w='18.5%' src={photoURL} mr='5%' />;
}
