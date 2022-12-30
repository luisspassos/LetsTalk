import { Image, ImageProps } from '@chakra-ui/react';
import { useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src: srcProp, ...props }: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [src, setSrc] = useState('https://www.svgrepo.com/show/12698/user.svg');

  function handleError() {
    setSrc('images/abstract-user.svg');
    setIsLoaded(true);
  }

  function handleLoad() {
    setIsLoaded(true);
  }

  const styles: ImageProps = {
    w: '12',
    h: '12',
    borderRadius: '50%',
  };

  return (
    // <Skeleton
    //   isLoaded={isLoaded}
    //   startColor='gray.400'
    //   endColor='gray.300'
    //   {...styles}
    //   {...props}
    // >
    <Image
      onError={handleError}
      onLoad={handleLoad}
      border='1px solid black'
      src={src}
      alt='Imagem de perfil'
      boxShadow='sm'
      {...styles}
      {...props}
    />
    // </Skeleton>
  );
}
