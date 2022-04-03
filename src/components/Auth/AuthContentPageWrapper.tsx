import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useFadeInAnimation } from '../../contexts/FadeInAnimationContext';

type AuthContentPageWrapper = {
  children: ReactNode;
} & FlexProps;

export function AuthContentPageWrapper({
  children,
  ...rest
}: AuthContentPageWrapper) {
  const { showFadeInAnimation } = useFadeInAnimation();

  return (
    <Flex
      {...rest}
      px='10'
      align='center'
      flex='1'
      justify='center'
      animation={showFadeInAnimation}
    >
      {children}
    </Flex>
  );
}
