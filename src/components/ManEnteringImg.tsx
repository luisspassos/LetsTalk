import { Image } from '@chakra-ui/react';
import { memo } from 'react';

function ManEnteringImgComponent() {
  return (
    <Image
      d={{ base: 'none', xl: 'block' }}
      h='350px'
      w='585.42px'
      src='/images/man_entering_img.svg'
      alt='Ilustração de login'
    />
  );
}

export const ManEnteringImg = memo(ManEnteringImgComponent);
