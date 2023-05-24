import { screen } from '@testing-library/dom';
import { FirebaseError } from 'firebase/app';
import { MockedFunc } from 'utils/types';
import { fillOutFormAndPressTheButton } from '.';

type Params = {
  mockedFunc: MockedFunc;
  errorCode: string;
  fillOutFormAndPressTheButton: fillOutFormAndPressTheButton;
  expectedText: string;
};

export type ReducedParams = Omit<
  Params,
  'mockedFunc' | 'fillOutFormAndPressTheButton'
>;

export async function testFirebaseError({
  mockedFunc,
  errorCode,
  fillOutFormAndPressTheButton,
  expectedText,
}: Params) {
  mockedFunc.mockImplementationOnce(() => {
    throw new FirebaseError(errorCode, 'fake error message');
  });

  await fillOutFormAndPressTheButton();

  expect(screen.getByText(expectedText)).toBeVisible();
}
