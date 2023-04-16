import { Button, useColorModeValue } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type ReadMoreButtonProps = {
  setNoOfLines: Dispatch<SetStateAction<number>>;
};

export function ReadMoreButton({ setNoOfLines }: ReadMoreButtonProps) {
  function readMore() {
    setNoOfLines((prevValue) => prevValue * 2);
  }

  return (
    <Button
      variant='unstyled'
      color={useColorModeValue('blue.700', 'blue.100')}
      ml='auto'
      fontFamily='message'
      fontWeight='normal'
      fontSize='1em'
      display='block'
      h='2em'
      onClick={readMore}
    >
      Ler mais
    </Button>
  );
}
