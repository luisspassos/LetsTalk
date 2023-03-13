import { Heading, HeadingProps } from '@chakra-ui/react';
import { RefObject } from 'react';

type TitleProps = {
  componentRef?: RefObject<HTMLHeadingElement>;
} & HeadingProps;

export function Base({ componentRef, ...rest }: TitleProps) {
  return (
    <Heading as='h1' fontWeight={400} ref={componentRef} {...rest}>
      Conversas
    </Heading>
  );
}
