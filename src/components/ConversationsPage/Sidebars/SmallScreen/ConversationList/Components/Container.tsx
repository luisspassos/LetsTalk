import { ChakraProps, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { styles as sharedStyles } from '../..';

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  const styles: ChakraProps = {
    padding: sharedStyles.px,
  };

  return (
    <Flex
      overflowY='auto'
      h='100%'
      mx={`-${styles.padding}`}
      direction='column'
      as='aside'
    >
      {children}
    </Flex>
  );
}
