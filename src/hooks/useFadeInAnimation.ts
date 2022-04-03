import { usePrefersReducedMotion, keyframes } from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

type NextRouterType = {
  components: any;
} & NextRouter;

const fadeIn = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export function useFadeInAnimation() {
  const router = useRouter() as NextRouterType;
  const routerComponents = router.components;

  const [enableAnimation, setEnableAnimation] = useState(false);

  useEffect(() => {
    if (Object.keys(routerComponents).length > 2) {
      setEnableAnimation(true);
    }
  }, [routerComponents]);

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = useMemo(
    () => (prefersReducedMotion ? undefined : `${fadeIn} 0.5s`),
    [prefersReducedMotion]
  );

  const showFadeInAnimation = enableAnimation ? animation : undefined;

  return { showFadeInAnimation };
}
