import { Image } from '@chakra-ui/react';

export function Empty() {
  return (
    <Image
      mx='auto'
      alignSelf='center'
      maxH={['150px', '200px', '250px']}
      src='/images/messages.svg'
      alt='Vázio'
      draggable={false}
    />
  );
}
