import { Center, CenterProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFadeInAnimation } from '../../hooks/useFadeInAnimation';

type CenterFormProps = {
  children: ReactNode;
} & CenterProps;

export function CenterForm({ children, ...rest }: CenterFormProps) {
  const { showFadeInAnimation } = useFadeInAnimation();

  return (
    <Center
      {...rest}
      p='2rem'
      h='100vh'
      flexDir='column'
      animation={showFadeInAnimation}
    >
      {children}
    </Center>
  );
}
