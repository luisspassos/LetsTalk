import { ChakraProps, ImageProps, Skeleton, Image } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, width, w = '12', h = '12', height, ...props }, ref) => {
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

    const styles: ChakraProps = {
      borderRadius: '50%',
    };

    return (
      <Skeleton
        isLoaded={isLoaded || !avatar}
        startColor='gray.300'
        endColor='gray.400'
        w={w}
        width={width}
        h={h}
        height={height}
        sx={{
          '&': {
            aspectRatio: '1 / 1',
          },
        }}
        ref={ref}
        {...props}
        {...styles}
      >
        <Image
          ref={ref}
          onLoad={handleLoad}
          onError={handleError}
          src={avatar}
          boxShadow='sm'
          alt='Imagem de perfil'
          w='100%'
          h='100%'
          {...styles}
          {...props}
        />
      </Skeleton>
    );
  }
);

Avatar.displayName = 'Avatar';
