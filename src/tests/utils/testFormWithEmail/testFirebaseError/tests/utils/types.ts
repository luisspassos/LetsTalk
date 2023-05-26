import { Label } from 'tests/utils/testFormWithEmail/createFillOutFormAndPressTheButton';
import { TestFirebaseErrorReduced } from '../..';

export type Params<L extends Label> = {
  testFirebaseError: TestFirebaseErrorReduced<L>;
};
