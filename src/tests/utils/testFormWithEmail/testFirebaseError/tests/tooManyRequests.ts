/* eslint-disable jest/no-export */
/* eslint-disable jest/expect-expect */

import { Label } from '../../createFillOutFormAndPressTheButton';
import { Params } from './utils/types';

export function tooManyRequests<L extends Label>({
  testFirebaseError,
}: Params<L>) {
  it('should should show an error message if there are too many requests', async () => {
    await testFirebaseError({
      errorCode: 'auth/too-many-requests',
      expectedText: 'Tente novamente mais tarde',
    });
  });
}
