import { usePrefersReducedMotion } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { NextRouter, useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type FadeInAnimationProviderProps = {
  children: ReactNode;
};

type NextRouterType = {
  components: any;
} & NextRouter;

type FadeInAnimationContextType = {
  showFadeInAnimation: string | undefined;
};

const FadeInAnimationContext = createContext({} as FadeInAnimationContextType);

const fadeIn = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export function FadeInAnimationProvider({
  children,
}: FadeInAnimationProviderProps) {
  const router = useRouter() as NextRouterType;
  const routerComponents = router.components;

  const [enableAnimation, setEnableAnimation] = useState(false);

  useEffect(() => {
    function checkIfThePageWasCalledFromARedirect() {
      if (Object.keys(routerComponents).length > 2) {
        setEnableAnimation(true);
      }
    }

    checkIfThePageWasCalledFromARedirect();
  }, [routerComponents]);

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${fadeIn} 0.5s`;

  const showFadeInAnimation = useMemo(
    () => (enableAnimation ? animation : undefined),
    [animation, enableAnimation]
  );

  return (
    <FadeInAnimationContext.Provider value={{ showFadeInAnimation }}>
      {children}
    </FadeInAnimationContext.Provider>
  );
}

export function useFadeInAnimation() {
  const data = useContext(FadeInAnimationContext);

  return data;
}
