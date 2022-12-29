import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
} from '@chakra-ui/react';

type AvatarProps = Omit<ChakraAvatarProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src, ...props }: AvatarProps) {
  return (
    <ChakraAvatar
      bg='none'
      src={src ?? 'images/abstract-user.svg'}
      icon={<></>}
      {...props}
    />
  );
}
