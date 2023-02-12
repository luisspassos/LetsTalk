import { ChakraProps, Image, ImageProps, Skeleton } from '@chakra-ui/react';
import { forwardRef, useEffect, useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ src, ...props }, ref) => {
    const abstractUserIcon = 'images/abstract-user.svg';

    const [isLoaded, setIsLoaded] = useState(false);

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
      setAvatar(src ?? abstractUserIcon);
    }, [src]);

    function handleLoad() {
      // setIsLoaded(true);
    }

    function handleError() {
      setAvatar(abstractUserIcon);
      // setIsLoaded(true);
    }

    const styles: ChakraProps = {
      borderRadius: '50%',
    };

    if (isLoaded) {
      return (
        <Image
          ref={ref}
          onLoad={handleLoad}
          onError={handleError}
          src={avatar}
          alt='Imagem de perfil'
          boxShadow='sm'
          {...styles}
          {...props}
        />
      );
    }

    return (
      <Skeleton
        {...styles}
        {...props}
        startColor='gray.300'
        endColor='gray.400'
      />
    );

    // return (
    //   <Skeleton
    //     isLoaded={isLoaded || !avatar}
    //     startColor='gray.300'
    //     endColor='gray.400'
    //     ref={ref}
    //     // {...props}
    //     // {...styles}
    //   >
    //     <Image
    //       ref={ref}
    //       onLoad={handleLoad}
    //       onError={handleError}
    //       src={avatar}
    //       alt='Imagem de perfil'
    //       w='12'
    //       h='12'
    //       boxShadow='sm'
    //       {...styles}
    //       {...props}
    //     />
    //   </Skeleton>
    // );
  }
);

Avatar.displayName = 'Avatar';
