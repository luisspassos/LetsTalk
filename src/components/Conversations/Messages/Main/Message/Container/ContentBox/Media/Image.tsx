import { Image as ChakraImage } from '@chakra-ui/react';
import { Wrapper } from './Wrapper';

export function Image() {
  return (
    <Wrapper>
      <ChakraImage
        src='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
        alt='Image'
      />
    </Wrapper>
  );
}
