import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FirstContentProps = {
  children: ReactNode;
} & FlexProps;

export function FirstContent({ children, ...rest }: FirstContentProps) {
  return <Flex justify='space-between' align='center' {...rest}>{children}</Flex>;
}
