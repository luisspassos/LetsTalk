import { useEffect } from 'react';
import * as LoginForm from 'components/LoginPage/Form';
import * as LoginButtonWithGoogle from 'components/LoginPage/Form/LoginButtonWithGoogle';

/**
 * A hook that adds a property to the window to be shared with Cypress and to be mocked
 * @NOTE Declare the property in the window interface in the hook file so the types are correct
 * @param winProp A string that is the name of the property to be added to the window
 * @param objToBeAdded An object to be passed to winProp
 * @example 
 * ```
 * // GoogleButton.tsx
 * const authMethods = {
 *  signInWithGoogle,
 * }
 * 
 * export type AuthMethods = typeof authMethods;
 * 
 * function GoogleButton() {
 *   useCypress('auth', authMethods)
 * }
 * 
 * // useCypres.ts
 * import * as GoogleButton from 'components/GoogleButton'
 * import * as LoginForm from 'components/LoginForm'
 * 
 * declare global {
    interface Window {
      Cypress?: any;
      auth?: GoogleButton.AuthMethods | LoginForm.AuthMethods;
    }
  }

 * ```
 */

declare global {
  interface Window {
    Cypress?: any;
    auth?: LoginButtonWithGoogle.AuthMethods | LoginForm.AuthMethods;
  }
}

export const useCypress = <T extends keyof Window>(
  winProp: T,
  objToBeAdded: (typeof window)[T]
) => {
  useEffect(() => {
    if (window.Cypress) {
      window[winProp] = objToBeAdded;
    }
  }, [objToBeAdded, winProp]);
};
