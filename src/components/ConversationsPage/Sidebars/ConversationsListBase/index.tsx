import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode, RefObject } from 'react';

type BaseProps = {
  children: ReactNode;
  componentRef?: RefObject<HTMLDivElement>;
} & FlexProps;

export function Base({ children, componentRef, ...rest }: BaseProps) {
  return (
    <Flex as='aside' direction='column' ref={componentRef} {...rest}>
      {children}
    </Flex>
  );
}
