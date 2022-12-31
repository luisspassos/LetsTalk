import { ImageProps, Img, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src: srcProp, ...props }: AvatarProps) {
  const abstractUserIcon = 'images/abstract-user.svg';

  const [isLoaded, setIsLoaded] = useState(false);

  const [src, setSrc] = useState(srcProp ?? abstractUserIcon);

  function handleLoad() {
    setIsLoaded(true);
  }

  function handleError() {
    setSrc(abstractUserIcon);
    setIsLoaded(true);
  }

  const styles = {
    borderRadius: '50%',
  };

  return (
    <Skeleton
      isLoaded={isLoaded}
      startColor='gray.300'
      endColor='gray.400'
      {...props}
      {...styles}
    >
      <Img
        onLoad={handleLoad}
        onError={handleError}
        src={src}
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
