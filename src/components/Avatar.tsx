import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src, ...props }: AvatarProps) {
  const abstractUserIcon = 'images/abstract-user.svg';

  const [isLoaded, setIsLoaded] = useState(false);

  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setAvatar(src ?? abstractUserIcon);
  }, [src]);

  function handleLoad() {
    setIsLoaded(true);
  }

  function handleError() {
    setAvatar(abstractUserIcon);
    setIsLoaded(true);
  }

  const styles: ImageProps = {
    borderRadius: '50%',
  };

  return (
    <Skeleton
      isLoaded={isLoaded || !avatar}
      startColor='gray.300'
      endColor='gray.400'
      {...props}
      {...styles}
    >
      <Image
        onLoad={handleLoad}
        onError={handleError}
        src={avatar}
        alt='Imagem de perfil'
        w='12'
        h='12'
        boxShadow='sm'
        {...styles}
        {...props}
      />
    </Skeleton>
  );
}
