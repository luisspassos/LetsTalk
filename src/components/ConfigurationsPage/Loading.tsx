import { Loading as LoadingComponent } from 'components/Loading';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';

export function Loading() {
  const [active, setActive] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    function disableLoading() {
      if (user) setActive(false);
    }

    disableLoading();
  }, [user]);

  return <LoadingComponent active={active} />;
}
