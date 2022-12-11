import { Avatar as ChakraAvatar } from '@chakra-ui/react';
import { useAuth } from '../../../../../contexts/AuthContext';

export function Avatar() {
  const { user } = useAuth();

  return (
    <ChakraAvatar
      boxShadow='1px 1px 8px 2px'
      color='blackAlpha.500'
      src={user?.picture}
      w={['54px', '59px', '64px']}
      h={['54px', '59px', '64px']}
    />
  );
}
