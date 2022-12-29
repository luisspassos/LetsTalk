import { Image, ImageProps } from '@chakra-ui/react';
import { useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src: srcProp, ...props }: AvatarProps) {
  const [src, setSrc] = useState(srcProp ?? 'images/abstract-user.svg');

  function handleError() {
    setSrc('images/abstract-user.svg');
  }

  return (
    <Image
      w='12'
      h='12'
      boxShadow='sm'
      borderRadius='50%'
      onError={handleError}
      src={src}
      alt='Avatar'
      {...props}
    />
  );
}
