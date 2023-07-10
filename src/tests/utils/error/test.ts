import { toast } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { base, Props as PropsBase, WinProp } from './base';

export type Props<WinPropT extends WinProp> = Omit<PropsBase<WinPropT>, 'err'>;

/**
 * A function that tests if an error is being displayed based on the error thrown
 *
 * @param props An object containing the following properties:
 * @param props.funcToBeStubbed An array containing the property of window where the function to be stubbed is. The format must be: `[winProp, funcToBeStubbed]`
 * @param props.submitForm A function that fills and submits the form
 * @param props.checkIfErrorAppeared A function that verifies if error is being displayed
 */

export function testError<WinPropT extends WinProp>(props: Props<WinPropT>) {
  beforeEach(() => {
    toast.closeAll();
  });

  it.only('should show an unknown error', () => {
    base({
      err: 'error',
      ...props,
    });
  });

  it.only('should show an unknown error from firebase', () => {
    base({
      err: new FirebaseError('', ''),
      ...props,
    });
  });
}
