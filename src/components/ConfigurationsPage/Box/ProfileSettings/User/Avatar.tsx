import { useAuth } from '../../../../../contexts/AuthContext';
import { Avatar as ChakraAvatar } from 'components/Avatar';

export function Avatar() {
  const { user } = useAuth();

  return (
    <ChakraAvatar
      // boxShadow='1px 1px 8px 2px'
      // color='blackAlpha.500'
      src={user?.photoURL}
      w={['54px', '59px', '64px']}
      h={['54px', '59px', '64px']}
    />
  );
}
