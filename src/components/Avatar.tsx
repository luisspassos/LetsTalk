import { ImageProps, Box, Img } from '@chakra-ui/react';
import { useState } from 'react';

type AvatarProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined;
};

export function Avatar({ src, ...props }: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleLoad() {
    setIsLoaded(true);
  }

  const styles = {
    w: '12',
    h: '12',
    borderRadius: '50%',
    boxShadow: 'sm',
  };

  return (
    <Box position='relative'>
      {/* {!isLoaded && (
        <Flex
          {...styles}
          {...props}
          direction='column'
          align='center'
          bg='gray.300'
          shrink={0}
          position='absolute'
          overflow='hidden'
        >
          <Box mt='20%' bg='white' w='35%' h='35%' borderRadius='50%' />
          <Box
            bg='white'
            w='75%'
            h='75%'
            borderRadius='50%'
            bottom='-35%'
            pos='absolute'
          />
        </Flex>
      )} */}

      <Img
        onLoad={handleLoad}
        src='images/abstract-user.svg'
        alt='Imagem de perfil'
        opacity={isLoaded ? 1 : 0}
        {...styles}
        {...props}
      />
    </Box>
  );
}
