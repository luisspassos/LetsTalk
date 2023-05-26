import { FirebaseError } from 'firebase/app';
import { MockedFunc } from 'utils/types';
import {
  FillOutFormAndPressTheButton,
  Label,
} from '../createFillOutFormAndPressTheButton';
import { formErrorExpect } from '../formErrorExpect';

type Params<L extends Label> = {
  mockedFunc: MockedFunc;
  errorCode: string;
  fillOutFormAndPressTheButton: FillOutFormAndPressTheButton<L>;
  expectedText: string;
};

export type ReducedParams<L extends Label> = Omit<
  Params<L>,
  'mockedFunc' | 'fillOutFormAndPressTheButton'
>;

export type TestFirebaseErrorReduced<L extends Label> = (
  rest: ReducedParams<L>
) => Promise<void>;

export async function testFirebaseError<L extends Label>({
  mockedFunc,
  errorCode,
  fillOutFormAndPressTheButton,
  expectedText,
}: Params<L>) {
  mockedFunc.mockImplementationOnce(() => {
    throw new FirebaseError(errorCode, 'fake error message');
  });

  await fillOutFormAndPressTheButton();

  formErrorExpect(expectedText);
}
