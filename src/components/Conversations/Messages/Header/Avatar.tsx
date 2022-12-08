import { ConversationType } from '../../../../contexts/ConversationsContext';
import { Avatar as ChakraAvatar } from '@chakra-ui/react';

type AvatarProps = {
  photoURL: ConversationType['photoURL'] | undefined;
};

const size = ['42px', '47px', '52px'];

export function Avatar({ photoURL }: AvatarProps) {
  return <ChakraAvatar w={size} h={size} src={photoURL ?? undefined} />;
}
