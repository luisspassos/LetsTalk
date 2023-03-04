import { useAuth } from '../../../../../contexts/AuthContext';
import { Avatar as AvatarComponent } from 'components/Avatar';

export function Avatar() {
  const { user } = useAuth();

  return (
    <AvatarComponent
      src={user?.photoURL}
      boxShadow='md'
      w='3.2em'
      flexShrink={0}
    />
  );
}
