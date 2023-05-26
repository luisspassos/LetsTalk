/* eslint-disable jest/no-export */
/* eslint-disable jest/expect-expect */

import { Label } from '../../createFillOutFormAndPressTheButton';
import { Params } from './utils/types';

export function userNotFound<L extends Label>({
  testFirebaseError,
}: Params<L>) {
  it('should show an error message if the user is not found', async () => {
    await testFirebaseError({
      errorCode: 'auth/user-not-found',
      expectedText: 'Este usuário não existe',
    });
  });
}
