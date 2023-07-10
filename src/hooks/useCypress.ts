import { useEffect } from 'react';
import * as LoginForm from 'components/LoginPage/Form';
import * as LoginButtonWithGoogle from 'components/LoginPage/Form/LoginButtonWithGoogle';
import * as RegistrationForm from 'components/RegistrationPage/Form';
import * as ForgotMyPasswordForm from 'components/ForgotMyPasswordPage/Form';
import * as ChangePasswordForm from 'components/ChangePasswordPage/Form';

/**
 * A hook that adds a property to the window to be shared with Cypress and to be mocked
 * @NOTE Declare the property in the window interface in the hook file so the types are correct. You need to add the types in cypress/index.d.ts too.
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
 * // useCypress.ts
 * import * as GoogleButton from 'components/GoogleButton'
 * import * as LoginForm from 'components/LoginForm'
 * 
 * declare global {
    interface Window {
      Cypress?: any;
      auth?: GoogleButton.AuthMethods | LoginForm.AuthMethods;
    }
  }

  // tests/index.d.ts
  interface ApplicationWindow {
    auth: import('components/GoogleButton').AuthMethods &
      import('components/LoginForm').AuthMethods;
  }

 * ```
 */

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

declare global {
  interface Window {
    Cypress?: any;
    auth?:
      | LoginButtonWithGoogle.AuthMethods
      | LoginForm.AuthMethods
      | RegistrationForm.AuthMethods
      | ForgotMyPasswordForm.AuthMethods
      | ChangePasswordForm.AuthMethods;
  }
}
