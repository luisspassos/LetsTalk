import { useEffect } from 'react';
import * as LoginForm from 'components/LoginPage/Form';
import * as LoginButtonWithGoogle from 'components/LoginPage/Form/LoginButtonWithGoogle';

type UseCypress = (winObj: string, objToBeAdded: object) => void;

export const useCypress: UseCypress = (winObj, objToBeAdded) => {
  useEffect(() => {
    if (window.Cypress) {
      window[winObj] = objToBeAdded;
    }
  }, [objToBeAdded, winObj]);
};

declare global {
  interface Window {
    Cypress?: any;
    auth?: LoginButtonWithGoogle.AuthMethods | LoginForm.AuthMethods;
  }
}
